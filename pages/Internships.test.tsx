// @vitest-environment jsdom
import React from 'react';
import { afterEach, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Internships from './Internships';

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

const stubJobs = (jobs: object[]) =>
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => jobs }));

it('shows sample internships and the details form when the server is unreachable', async () => {
  vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
  vi.spyOn(console, 'error').mockImplementation(() => {});
  render(<Internships />);

  await screen.findByText('Embedded Systems');
  fireEvent.click(screen.getAllByText('Apply Now')[0]);

  expect(screen.getByLabelText(/Full Name/)).toBeTruthy();
  expect(screen.getByLabelText(/College/)).toBeTruthy();
  expect((screen.getByText('Submit Application') as HTMLButtonElement).disabled).toBe(true);
});

it('uses live internships and allows submitting when they load', async () => {
  stubJobs([{ _id: 'abc', title: 'Live Role', location: 'Remote', type: 'Short-Term Internship' }]);
  render(<Internships />);

  await screen.findByText('Live Role');
  expect(screen.queryByText('Embedded Systems')).toBeNull();
  fireEvent.click(screen.getByText('Apply Now'));

  expect((screen.getByText('Submit Application') as HTMLButtonElement).disabled).toBe(false);
});
