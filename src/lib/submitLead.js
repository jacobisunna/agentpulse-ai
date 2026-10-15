// Delivers a blueprint request (lead) to the endpoint configured in
// VITE_LEAD_ENDPOINT: any URL that accepts a JSON POST, such as a Formspree form,
// a Zapier / Make / n8n webhook or your own API route. See .env.example.
//
// Without an endpoint (local development, unconfigured previews) nothing is sent:
// the call resolves with { delivered: false } so the UI can stay truthful.

const REQUEST_TIMEOUT_MS = 15000;
const OFFLINE_DELAY_MS = 600;

/**
 * @param {Record<string, unknown>} lead Form data collected by the blueprint modal.
 * @returns {Promise<{ delivered: boolean }>}
 * @throws {Error} When the endpoint is set but the request fails or times out.
 */
export async function submitLead(lead) {
  const endpoint = (import.meta.env.VITE_LEAD_ENDPOINT || '').trim();

  if (!endpoint) {
    await new Promise((resolve) => setTimeout(resolve, OFFLINE_DELAY_MS));
    // Deliberately does not log the lead itself: it contains personal data.
    console.warn('[AgentPulse] VITE_LEAD_ENDPOINT is not set; blueprint request was not delivered.');
    return { delivered: false };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        ...lead,
        submittedAt: new Date().toISOString(),
        page: window.location.href,
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      throw new Error(`Lead endpoint responded with HTTP ${res.status}`);
    }
    return { delivered: true };
  } catch (err) {
    if (err?.name === 'AbortError') {
      throw new Error('Lead endpoint did not respond in time');
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}
