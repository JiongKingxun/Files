const qualitySlugs = {
  'chengdu-camellias.mp4': 'chengdu-camellias',
  'palace-bts.mp4': 'palace-bts',
  'dream-walker.mp4': 'dream-walker',
  'moonlight.mp4': 'moonlight',
  'gaohuan-prequel-06.mp4': 'gaohuan-prequel-06',
  'gaohuan-prequel-07.mp4': 'gaohuan-prequel-07',
  'gaohuan-prequel-08.mp4': 'gaohuan-prequel-08',
  'opening-demo-v2.mp4': 'shaocheng-opening-demo',
};

const originalUses720 = new Set([
  'chengdu-camellias.mp4',
  'palace-bts.mp4',
  'gaohuan-prequel-06.mp4',
  'gaohuan-prequel-07.mp4',
  'gaohuan-prequel-08.mp4',
]);

export function getVideoQualities(src) {
  if (src.endsWith('/gaohuan-10/index.m3u8')) {
    return [
      { id: '480', label: '480P', src: '/media/gaohuan-10/480/index.m3u8' },
      { id: '720', label: '720P', src: '/media/gaohuan-10/720.m3u8' },
      { id: 'original', label: '原画', src: '/media/gaohuan-10/720.m3u8' },
    ];
  }

  const filename = src.split('/').at(-1);
  const slug = qualitySlugs[filename];
  if (!slug) return [{ id: 'original', label: '原画', src }];
  const fullQualitySource = originalUses720.has(filename) ? `/media/quality/${slug}/720/index.m3u8` : src;
  return [
    { id: '480', label: '480P', src: `/media/quality/${slug}/480/index.m3u8` },
    { id: '720', label: '720P', src: `/media/quality/${slug}/720/index.m3u8` },
    { id: 'original', label: '原画', src: fullQualitySource },
  ];
}
