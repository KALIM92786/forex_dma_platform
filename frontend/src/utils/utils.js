// Format numbers as currency
export function formatCurrency(amount, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

// Format date to a readable string
export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Capitalize the first letter of a string
export function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
