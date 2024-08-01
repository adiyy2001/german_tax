export const formatToGermanDate = (dateString: string): string => {
    return dateString.replace(/(\d{4})(\d{2})(\d{2})/, '$3.$2.$1');
  };
  