import React from 'react';
import { X } from 'lucide-react';

interface RefundPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RefundPolicyModal: React.FC<RefundPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-violet-500/30 rounded-3xl p-8 shadow-[0_0_50px_rgba(139,92,246,0.3)] animate-in zoom-in-95 duration-200 overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full z-10"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Cancellation & Refund Policy</h2>
          <p className="text-slate-400 text-sm">Last updated on 05-03-2026 19:46:43</p>
        </div>

        <div className="text-slate-300 text-sm leading-relaxed space-y-4">
          <p>
            SPHERONIX TECHNOLOGY PRIVATE LIMITED believes in helping its customers as far as possible,
            and has therefore a liberal cancellation policy. Under this policy:
          </p>

          <p>
            • Cancellations will be considered only if the request is made immediately after placing the order.
            However, the cancellation request may not be entertained if the orders have been communicated to the
            vendors/merchants and they have initiated the process of shipping them.
          </p>

          <p>
            • SPHERONIX TECHNOLOGY PRIVATE LIMITED does not accept cancellation requests for
            perishable items like flowers, eatables etc. However, refund/replacement can be made if the customer
            establishes that the quality of product delivered is not good.
          </p>

          <p>
            • In case of receipt of damaged or defective items please report the same to our Customer Service team.
            The request will, however, be entertained once the merchant has checked and determined the same at his
            own end. This should be reported within 2 Days days of receipt of the products. In case you feel that the
            product received is not as shown on the site or as per your expectations, you must bring it to the notice of
            our customer service within 2 Days days of receiving the product. The Customer Service Team after
            looking into your complaint will take an appropriate decision.
          </p>

          <p>
            • In case of complaints regarding products that come with a warranty from manufacturers, please refer
            the issue to them. In case of any Refunds approved by the SPHERONIX TECHNOLOGY PRIVATE
            LIMITED, it’ll take 1-2 Days days for the refund to be processed to the end customer.
          </p>
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={onClose}
            className="bg-violet-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-violet-700 transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicyModal;
