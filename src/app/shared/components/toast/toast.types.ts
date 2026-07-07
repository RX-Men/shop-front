type ToastStatus = 'success' | 'error';

interface Toast {
  id: string;
  heading: string;
  description?: string;
  status: ToastStatus;
  // duration: number;
}

export type { Toast };
