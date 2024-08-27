export const responseMessageGenerator = async (
  status: string,
  message: string,
  data?: any,
): Promise<ApiResponse> => {

  const format = {
    status,
    message,
    data: data,
  };

  return format;
};

export interface ApiResponse {
  status: string;
  message: string;
  data: any;
}
