const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "905xxxxxxxxx";

export function generateWhatsAppLink(productSku: string, productTitle: string): string {
  const message = encodeURIComponent(
    `Merhaba! Şu ürünle ilgileniyorum: ${productSku} - ${productTitle}`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

export function generateOrderLink(
  productSku: string,
  productTitle: string,
  size?: string
): string {
  const sizeText = size ? ` | Beden: ${size}` : "";
  const message = encodeURIComponent(
    `Merhaba! Sipariş vermek istiyorum:\n\nÜrün: ${productTitle}\nKod: ${productSku}${sizeText}\n\nBilgi alabilir miyim?`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

export function generateContactLink(subject?: string): string {
  const message = encodeURIComponent(
    subject
      ? `Merhaba! ${subject} hakkında bilgi almak istiyorum.`
      : "Merhaba! Dantel Sepeti hakkında bilgi almak istiyorum."
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}
