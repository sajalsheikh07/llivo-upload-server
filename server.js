const express = require('express');
const integrationSdk = require('sharetribe-flex-integration-sdk');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

const sdk = integrationSdk.createInstance({
  clientId: 'ad058074-59d2-4b7f-9b9a-4858e1a380cf',
  clientSecret: 'ac0c2984c12a96e165e449905883814beecc0fe5'
});

app.post('/upload', async (req, res) => {
  try {
    const { imageUrl } = req.body;
    const response = await fetch(imageUrl);
    const buffer = await response.buffer();
    const result = await sdk.images.upload(
      { image: buffer },
      { expand: true }
    );
    res.json({ success: true, imageId: result.data.data.id.uuid });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/', (req, res) => res.send('Llivo Upload Server Running'));
app.listen(process.env.PORT || 3000);
