const JSZip = require('jszip');

async function analyzeRealPptx() {
  const zip = new JSZip();

  const slide1xml = [
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
    '<p:sld xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main"',
    '       xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main">',
    '<p:cSld><p:spTree><p:sp><p:txBody>',
    '<a:p><a:r><a:t>Introduction to Process Scheduling</a:t></a:r></a:p>',
    '<a:p><a:r><a:t>CPU Scheduler selects processes from ready queue</a:t></a:r></a:p>',
    '</p:txBody></p:sp></p:spTree></p:cSld></p:sld>'
  ].join('\n');

  zip.file('ppt/slides/slide1.xml', slide1xml);
  zip.file('ppt/slides/slide2.xml', slide1xml.replace('Process Scheduling', 'Deadlock Prevention'));

  const buf = await zip.generateAsync({ type: 'nodebuffer' });
  const loaded = await JSZip.loadAsync(buf);

  const allKeys = Object.keys(loaded.files);
  console.log('All keys:', allKeys);

  // Test patterns
  const p1 = allKeys.filter(k => k.match(/^ppt\/slides\/slide\d+\.xml$/));
  const p2 = allKeys.filter(k => /slides\/slide\d+\.xml/.test(k));
  const p3 = allKeys.filter(k => /slides[/\\]slide\d+\.xml/i.test(k) && !loaded.files[k].dir);

  console.log('Pattern 1:', p1);
  console.log('Pattern 2:', p2);
  console.log('Pattern 3:', p3);

  // Parse XML
  for (const sp of p1) {
    const xml = await loaded.files[sp].async('string');
    const textMatches = [...xml.matchAll(/<a:t[^>]*>([^<]+)<\/a:t>/g)].map(m => m[1]);
    console.log('Slide', sp, 'text:', textMatches);
  }
}

analyzeRealPptx().catch(console.error);
