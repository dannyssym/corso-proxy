export default async function handler(req, res) {
  const path = req.query.path || '';
  const targetUrl = `https://corsomovement.brandbot-checkout.com/${path}`;
  
  try {
    const response = await fetch(targetUrl);
    const contentType = response.headers.get('content-type') || 'text/html';
    
    let body = await response.text();
    
    if (!body) {
      res.status(500).send('Empty response from brandbot');
      return;
    }

    body = body.replace(
      /https:\/\/corsomovement\.brandbot-checkout\.com/g,
      'https://corso-proxy.vercel.app/checkout'
    );
    body = body.replace(
      /https:\/\/corsomovement\.marianaiframes\.com/g,
      'https://corso-proxy.vercel.app/marianaiframes'
    );
    body = body.replace(
      /https:\/\/assets\.brandbot\.com/g,
      'https://corso-proxy.vercel.app/brandbot-assets'
    );

    res.setHeader('Content-Type', contentType);
    res.setHeader('X-Frame-Options', 'ALLOWALL');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(body);

  } catch (err) {
    res.status(500).send(`Proxy error: ${err.message}`);
  }
}
