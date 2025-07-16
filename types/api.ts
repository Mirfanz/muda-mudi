export type ResponseSuccess<R = null> = {
  status: "success";
  status_code: number;
  result: R;
  message: string;
};

export type ResponseError = {
  status: "error";
  status_code: number;
  message: string;
};

export type ResponseApi<R = null> = ResponseSuccess<R> | ResponseError;

export type Supporter = {
  supporter_name: string;
  support_message: string | null;
  quantity: number;
  amount: number;
  unit_name: string;
  updated_at: string | Date;
};
