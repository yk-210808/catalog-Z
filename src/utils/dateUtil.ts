

export function formatDate(date: string) {
  const newDate = new Date(date).toLocaleDateString('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return newDate;
}