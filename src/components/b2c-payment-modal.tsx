"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Loader2, CheckCircle2, IndianRupee } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface B2CPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  itemType: string;
  itemName: string;
  amount: number;
  description?: string;
  email?: string;
  name?: string;
}

export function B2CPaymentModal({
  isOpen,
  onClose,
  onSuccess,
  itemType,
  itemName,
  amount,
  description,
  email,
  name,
}: B2CPaymentModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    setError("");

    try {
      const amountInRupees = Math.round(amount);
      const orderRes = await fetch("/api/razorpay/b2c/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemType,
          itemName,
          amount: amountInRupees,
          metadata: { description: description || itemName },
          email,
          name,
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        throw new Error(orderData.error || "Failed to create payment order");
      }

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "MentorMe",
        description: description || itemName,
        order_id: orderData.orderId,
        prefill: {
          name: name || "",
          email: email || "",
          contact: "",
        },
        theme: {
          color: "#0872B8",
        },
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch("/api/razorpay/b2c/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                paymentId: orderData.paymentId,
                itemType,
                itemId: null,
              }),
            });

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok) {
              throw new Error(verifyData.error || "Payment verification failed");
            }

            setSuccess(true);
            if (typeof window !== "undefined" && (window as any).gtag) {
              (window as any).gtag("event", "purchase", {
                transaction_id: response.razorpay_payment_id || response.razorpay_order_id,
                value: amountInRupees,
                currency: "INR",
                items: [
                  {
                    item_id: itemType,
                    item_name: itemName,
                    price: amountInRupees,
                    quantity: 1,
                  },
                ],
              });
            }
            setTimeout(() => {
              onSuccess();
              onClose();
            }, 1500);
          } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Payment verification failed");
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Payment failed");
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ type: "spring", damping: 24, stiffness: 300 }}
        className="bg-white rounded-[2rem] shadow-2xl max-w-md w-full overflow-hidden border border-slate-100"
      >
        {success ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-black text-slate-800">Payment Successful!</h3>
            <p className="text-slate-500 text-sm">Thank you for your purchase. You now have access to this item.</p>
          </div>
        ) : (
          <>
            <div className="relative bg-gradient-to-br from-brand-blue to-blue-900 px-6 py-5 text-white">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-black">Complete Payment</h3>
                  <p className="text-blue-100 text-sm mt-1">{description || itemName}</p>
                </div>
                <button
                  onClick={onClose}
                  disabled={loading}
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors disabled:opacity-50 shrink-0"
                >
                  <X size={20} className="text-white/80" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-sm font-medium">
                  {error}
                </div>
              )}

              <div className="bg-slate-50 rounded-2xl p-5 space-y-4 border border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-600">Item</span>
                  <span className="text-sm font-bold text-slate-800 text-right max-w-[60%]">{itemName}</span>
                </div>
                <div className="h-px bg-slate-200"></div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-600">Amount</span>
                  <div className="flex items-center gap-1 text-xl font-black text-slate-800">
                    <IndianRupee size={20} />
                    {amount.toLocaleString("en-IN")}
                  </div>
                </div>
              </div>

              <Button
                onClick={handlePayment}
                disabled={loading}
                className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white font-bold py-5 rounded-xl shadow-lg shadow-brand-blue/20 transition-all disabled:opacity-50 text-base"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={18} />
                    Processing...
                  </>
                ) : (
                  `Pay ₹${amount.toLocaleString("en-IN")}`
                )}
              </Button>

              <div className="flex items-center justify-center gap-2 text-slate-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <p className="text-[10px] text-center">
                  Secure payment powered by Razorpay. Your payment information is encrypted.
                </p>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
