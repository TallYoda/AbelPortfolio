import emailjs, { EmailJSResponseStatus } from '@emailjs/browser'

function getEmailJsConfig() {
  const serviceId =
    import.meta.env.EMAILJS_SERVICE_ID ||
    import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId =
    import.meta.env.EMAILJS_TEMPLATE_ID ||
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey =
    import.meta.env.EMAILJS_PUBLIC_KEY ||
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  if (!serviceId || !templateId || !publicKey) {
    throw new Error(
      'Email service is not configured yet. Add EmailJS keys to continue.'
    )
  }

  return { serviceId, templateId, publicKey }
}

function getErrorMessage(error: unknown): string {
  if (error instanceof EmailJSResponseStatus) {
    return error.text || `EmailJS error (${error.status})`
  }

  if (error instanceof Error) {
    return error.message
  }

  if (typeof error === 'string') {
    return error
  }

  if (
    error &&
    typeof error === 'object' &&
    'text' in error &&
    typeof (error as { text: unknown }).text === 'string'
  ) {
    return (error as { text: string }).text
  }

  return 'Unable to send right now. Please try again soon.'
}

export async function sendContactForm(form: HTMLFormElement) {
  const { serviceId, templateId, publicKey } = getEmailJsConfig()
  const data = new FormData(form)

  const userName = String(data.get('user_name') ?? '').trim()
  const userEmail = String(data.get('user_email') ?? '').trim()
  const message = String(data.get('message') ?? '').trim()

  if (!userName || !userEmail || !message) {
    throw new Error('Please fill in your name, email, and message.')
  }

  try {
    return await emailjs.send(
      serviceId,
      templateId,
      {
        user_name: userName,
        user_email: userEmail,
        from_name: userName,
        from_email: userEmail,
        reply_to: userEmail,
        message,
      },
      { publicKey }
    )
  } catch (error) {
    throw new Error(getErrorMessage(error))
  }
}
