const validate = (schema: any, data: any) => {
  const validatedData = schema.safeParse(data);
  if (!validatedData.success) {
    throw ({ status: 400, message: validatedData.error.issues });
  }
  return validatedData.data;
};

export default validate;