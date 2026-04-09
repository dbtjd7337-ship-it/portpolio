export type MediaType = 'image' | 'video';

export interface ProjectMedia {
  src: string;
  type: MediaType;
  caption?: string;
}

export interface BehanceLink {
  url: string;
  label: string;
  thumbnail: string;
  hoverLabel?: string;
}

export interface Project {
  id: string;
  name: string;
  category: 'projectA' | 'projectB' | 'projectC';
  categoryLabel: string;
  tags: string[];
  description: string;
  thumbnail: ProjectMedia;
  media: ProjectMedia[];
  /** 갤러리 레이아웃: 숫자 = full-width, 숫자 배열 = 균등 분할, 객체 = 비율 지정, group = 컨테이너로 묶기 */
  mediaLayout?: (number | number[] | { indices: number[]; cols: string } | { group: (number | number[] | { indices: number[]; cols: string })[]; label?: string; description?: string })[];
  behanceLinks?: BehanceLink[];
  /** 특정 미디어 아이템에 연결할 링크: { 인덱스: url } */
  mediaLinks?: Record<number, string>;
  /** 프로젝트 외부 링크 */
  links?: { label: string; url: string }[];
}

export const projects: Project[] = [
  // ─── Project A : 3D Modeling ──────────────────────────────────────────────
  {
    id: 'rx78',
    name: 'RX-78',
    category: 'projectA',
    categoryLabel: '3D Modeling',
    tags: ['Hard Surface', 'Mech', 'Plasticity', 'Blender', 'Rendering'],
    description:
      '본격적인 메카닉 하드서피스 모델링의 시작점이 된 작업이다.\n좋아하는 건담을 직접 만들고 싶다는 순수한 동기에서 출발해\nPlasticity로 모델링하고, Blender에서 텍스처링·리깅·\n애니메이팅·렌더링·컴포지팅까지 전 과정을 완성했다.\n\n장난감 특유의 귀여움을 가진 SD 건담의 실루엣에\n사실적인 렌더링을 접목해, 장난감이 실제 로봇처럼\n작동하는 듯한 느낌을 만들어내는 것이 이 작업의 목표였다.\n\n귀여움과 실재감이 공존하는 그 접점을 찾는 과정이\n이 프로젝트의 핵심이었다.',
    thumbnail: { src: '/images/projectA/rx78/rx78_main.mp4', type: 'video' },
    media: [
      { src: '/images/projectA/rx78/rx78_1.webp', type: 'image' },   // 0
      { src: '/images/projectA/rx78/rx78_2.webp', type: 'image' },   // 1
      { src: '/images/projectA/rx78/rx78_3.webp', type: 'image' },   // 2
      { src: '/images/projectA/rx78/rx78_4.webp', type: 'image' },   // 3
      { src: '/images/projectA/rx78/rx78_5.webp', type: 'image' },   // 4
      { src: '/images/projectA/rx78/rx78_6.webp', type: 'image' },   // 5
      { src: '/images/projectA/rx78/rx78_7.webp', type: 'image' },   // 6
      { src: '/images/projectA/rx78/rx78_8.webp', type: 'image' },   // 7
      { src: '/images/projectA/rx78/rx78_9.webp', type: 'image' },   // 8
      { src: '/images/projectA/rx78/rx78_10.webp', type: 'image' },  // 9
    ],
    mediaLayout: [
      { indices: [7, 8], cols: '0.88fr 0.86fr' },  // rx78_8, rx78_9 — 메인 바로 아래
      { indices: [6, 9], cols: '1.24fr 1.30fr' },  // rx78_7, rx78_10 — 그 아래
      0, 1, 2, 3, 4, 5,
    ],
  },
  {
    id: 'freedom-gundam',
    name: 'Freedom Gundam',
    category: 'projectA',
    categoryLabel: '3D Modeling',
    tags: ['Hard Surface', 'Mech', 'Plasticity', 'Blender', 'Rendering'],
    description:
      '시중에 출시된 MGSD 프리덤 건담 프라모델을 직접 참고해\nPlasticity로 모델링, Blender에서 텍스처링·렌더링·컴포지팅까지\n완성한 작업이다.\n\n실제 프라모델의 수치에 최대한 근접하게 모델링하고,\n프라모델이 실제로 움직일 수 있는 기믹 구조를 그대로\n3D 리그로 재현하는 것에 집중했다.\n\nBone Constraint를 적극 활용해 관절의 가동 범위와\n연동 구조를 프라모델과 동일하게 설계했으며,\n동시에 애니메이터가 직관적으로 다룰 수 있는\n리그 구조를 구축하는 데 공을 들였다.',
    thumbnail: { src: '/images/projectA/freedom-gundam/freedom-gundam_main.mp4', type: 'video' },
    media: [
      { src: '/images/projectA/freedom-gundam/freedom-gundam_1.webp', type: 'image' },
      { src: '/images/projectA/freedom-gundam/freedom-gundam_2.webp', type: 'image' },
      { src: '/images/projectA/freedom-gundam/freedom-gundam_3.webp', type: 'image' },
      { src: '/images/projectA/freedom-gundam/freedom-gundam_4.webp', type: 'image' },
      { src: '/images/projectA/freedom-gundam/freedom-gundam_5.webp', type: 'image' },
      { src: '/images/projectA/freedom-gundam/freedom-gundam_6.webp', type: 'image' },
      { src: '/images/projectA/freedom-gundam/freedom-gundam_7.webp', type: 'image' },
      { src: '/images/projectA/freedom-gundam/freedom-gundam_8.webp', type: 'image' },
      { src: '/images/projectA/freedom-gundam/freedom-gundam_9.webp', type: 'image' },
      { src: '/images/projectA/freedom-gundam/freedom-gundam_10.webp', type: 'image' },
      { src: '/images/projectA/freedom-gundam/freedom-gundam_12.webp', type: 'image' },
    ],
    mediaLayout: [0, [1, 2], 3, 4, [5, 6], 7, 8, 9, 10],
  },
  {
    id: 'asurada',
    name: 'Asurada',
    category: 'projectA',
    categoryLabel: '3D Modeling',
    tags: ['Hard Surface', 'Blender', 'Rendering'],
    description:
      '《신세기 GPX 사이버 포뮬러》아스라다의 부스터 모드 변형을 실제로 작동 가능한 메커니즘으로 구현하는 것에 집중한 작업이다.\n\n애니메이션에서 연출로 처리되는 변신 장면을 파츠 분할과 이동 경로를 직접 설계해 물리적 설득력을 부여했다.\n\n하드서피스 모델링으로 엣지와 패널 라인을 정밀하게 구성하면서, 변형 전후의 실루엣이 자연스럽게 이어지도록 구조적 완성도에 집중했다.',
    thumbnail: { src: '/images/projectA/asurada/asurada_main.mp4', type: 'video' },
    media: [
      { src: '/images/projectA/asurada/asurada_1.webp', type: 'image' },
      { src: '/images/projectA/asurada/asurada_2.webp', type: 'image' },
      { src: '/images/projectA/asurada/asurada_3.webp', type: 'image' },
      { src: '/images/projectA/asurada/asurada_4.webp', type: 'image' },
      { src: '/images/projectA/asurada/asurada_5.mp4', type: 'video' },
      { src: '/images/projectA/asurada/asurada_6.mp4', type: 'video' },
    ],
    mediaLayout: [0, [1, 2], 3, 4, 5],
  },
  {
    id: 'mobi',
    name: 'Mobi',
    category: 'projectA',
    categoryLabel: '3D Modeling',
    tags: ['Character', 'Product', 'Blender'],
    description:
      'MMZ 플랫폼의 PFP 캐릭터 \'MOBI\'의 캐릭터 디자인 기획부터\n3D PFP 생산까지 전 과정을 리드한 프로젝트다.\n\nMMZ는 영화 팬들이 함께 모여 다양한 프로젝트에 참여하고,\n그 기록을 고유한 PFP 형태의 인증서로 수집하는 플랫폼이다.\nMOBI는 그 인증서이자 멤버의 정체성을 담는 캐릭터로 기획되었다.\n\n로맨스, 호러, 서부, SF, 사극, 역사극, 코미디, 범죄액션 등\n영화 장르를 테마로 삼아 각 장르에 맞는 의상, 표정, 오브젝트를\n조합해 약 2,000개의 PFP 배리에이션을 제작·발행했다.\n\n3D PFP 생산은 사내에 전례가 없던 작업이었다.\n기존 기술 없이 직접 R&D를 진행하며\nBlender 안에서 3D PFP를 대량 생산할 수 있는\n파이프라인을 구축하고 실제 발행까지 완수했다.',
    thumbnail: { src: '/images/projectA/mobi/mobi_main.webp', type: 'image' },
    media: [
      { src: '/images/projectA/mobi/mobi_1.mp4', type: 'video' },
      { src: '/images/projectA/mobi/mobi_4.webp', type: 'image' },
      { src: '/images/projectA/mobi/mobi_2.webp', type: 'image' },
      { src: '/images/projectA/mobi/mobi_3.webp', type: 'image' },
    ],
    behanceLinks: [
      {
        url: 'https://www.behance.net/gallery/193852131/MMZ-Project-MOBI',
        label: 'MMZ Project MOBI',
        thumbnail: '/images/projectA/mobi/mobi_thum1.webp',
      },
      {
        url: 'https://www.behance.net/gallery/188374521/MMZ-BXWebUIUXContent',
        label: 'MMZ BX · Web UI/UX · Content',
        thumbnail: '/images/projectA/mobi/mobi_thum2.webp',
      },
    ],
  },
  {
    id: 'photocard',
    name: 'Momentica Opening Movie',
    category: 'projectA',
    categoryLabel: '3D Modeling',
    tags: ['Motion', 'VFX', 'Blender', 'Compositing'],
    description:
      '두나무 계열사 레벨스가 운영하는 아이돌 팬덤 앱 플랫폼\n\'모먼티카\'의 디지털 포토카드 오픈 영상 제작 프로젝트다.\n르세라핌을 대상으로, 기존의 단조로운 오프닝 영상을\n새롭게 교체하기 위해 진행되었다.\n\n포토카드 오픈 영상 특성상 반복 노출되는 콘텐츠이기 때문에\n지루하지 않으면서도 짧고 강렬하게 끝나는 것이 핵심이었다.\n팬이 카드를 열었을 때 기대감과 감각적인 임팩트를\n순간적으로 전달할 수 있도록 연출과 타이밍에 집중해 작업했다.',
    thumbnail: { src: '/images/projectA/photocard/photocard_main.mp4', type: 'video' },
    media: [
      { src: '/images/projectA/photocard/photocard_1.mp4', type: 'video' },
      { src: '/images/projectA/photocard/photocard_2.mp4', type: 'video' },
    ],
  },
  {
    id: 'dog',
    name: 'Hyundai Card Web3 Petset',
    category: 'projectA',
    categoryLabel: '3D Modeling',
    tags: ['Character', 'Organic', 'Rigging', 'Blender'],
    description:
      '현대카드 앱 내 동물보호센터의 유기견을 NFT 캐릭터로 제작,\n기부를 유도하는 프로젝트를 위해 제작된 10종의 강아지 캐릭터다.\n\n종마다 다양한 의상을 적용할 수 있으며,\n앱 안에서 터치를 통해 캐릭터와 직접 상호작용할 수 있도록 기획되었다.\n\n평소 동물 다큐멘터리와 영상을 즐겨 보며 쌓아온 관심을 바탕으로,\n작업을 위해 강아지의 행동 양상을 더 깊이 분석하는 과정을 거쳤다.\n기분과 상황에 따른 행동 패턴을 세분화해 애니메이팅했으며,\n단순히 귀여운 움직임이 아닌 실제 강아지처럼\n행동할 것 같다는 설득력을 만드는 데 집중했다.',
    thumbnail: { src: '/images/projectA/dog/dog_main.webp', type: 'image' },
    media: [
      { src: '/images/projectA/dog/dog_1.webp', type: 'image' },
      { src: '/images/projectA/dog/dog_2.mp4', type: 'video' },
      { src: '/images/projectA/dog/dog_3.mp4', type: 'video' },
      { src: '/images/projectA/dog/dog_4.mp4', type: 'video' },
    ],
    mediaLayout: [0, { indices: [1, 2], cols: '2fr 1fr' }, 3],
  },
  {
    id: 'rolex',
    name: 'VIVER Brand Visual',
    category: 'projectA',
    categoryLabel: '3D Modeling',
    tags: ['Product', 'Hard Surface', 'Rendering', 'Shading'],
    description:
      '고급 시계 브랜드 VIVER의 브랜드 리뉴얼 프로젝트에서\n롤렉스 시계를 활용한 비주얼라이징 작업을 담당했다.\n\n이 작업의 핵심은 시계 부품 하나하나를 정확한 치수로\n재현하는 것이었다. 실제 CAD 도면을 참고해\n톱니바퀴의 개수까지 직접 세며 모델링했으며,\n기계적 정밀함을 3D로 그대로 옮기는 데 집중했다.\n\n제품 디자인을 전공한 배경이 이 작업에서 온전히 발휘된\n프로젝트로, 구조적 이해를 바탕으로 한 디테일에 대한\n집착이 결과물의 완성도로 이어진 작업이다.',
    thumbnail: { src: '/images/projectA/rolex/rolex_main.mp4', type: 'video' },
    media: [
      { src: '/images/projectA/rolex/rolex_1.webp', type: 'image' },
      { src: '/images/projectA/rolex/rolex_2.webp', type: 'image' },
      { src: '/images/projectA/rolex/rolx_3.webp', type: 'image' },
      { src: '/images/projectA/rolex/rolex_4.webp', type: 'image' },
      { src: '/images/projectA/rolex/rolex_5.webp', type: 'image' },
      { src: '/images/projectA/rolex/rolex_6.webp', type: 'image' },
      { src: '/images/projectA/rolex/rolex_7.webp', type: 'image' },
      { src: '/images/projectA/rolex/rolex_8.webp', type: 'image' },
      { src: '/images/projectA/rolex/rolex_9.mp4', type: 'video' },
    ],
    mediaLayout: [0, [1, 2], 3, 4, 5, 6, 7, 8],
    behanceLinks: [
      {
        url: 'https://www.behance.net/gallery/211935139/VIVER-BXUIUXContent',
        label: 'VIVER BX · UI/UX · Content',
        thumbnail: '/images/projectA/rolex/rolex_thum.webp',
      },
    ],
  },
  {
    id: 'tiger',
    name: 'Tiger "한청"',
    category: 'projectA',
    categoryLabel: '3D Modeling',
    tags: ['Character', 'Organic', 'Texturing', 'Rigging'],
    description:
      '두나무 X 한국수목원정원관리원 X 스튜디오256이 함께한\n\'세계 호랑이의 날(7월 29일)\'을 기념한 NFT 프로젝트다.\n생물 다양성과 산림생물자원 보전의 중요성을 알리기 위해\n국립백두대간수목원에 서식하는 호랑이 \'한청\'을\n업비트 NFT로 제작·발행했다.\n\n작업에 앞서 직접 수목원을 방문해 한청을 관찰하고\n영상으로 기록하는 과정을 거쳤다.\n실제 동물의 움직임과 체형을 직접 눈으로 확인하고\n그것을 모델링과 애니메이션에 반영했다.\n\n실사 동물을 3D로 구현하고 애니메이팅하는\n첫 경험이었던 만큼, 작업의 깊이와 함께\n많은 인사이트를 얻었던 프로젝트다.',
    thumbnail: { src: '/images/projectA/tiger/tiger_main.mp4', type: 'video' },
    media: [
      { src: '/images/projectA/tiger/tiger_1.mp4', type: 'video' },
      { src: '/images/projectA/tiger/tiger_2.webp', type: 'image' },
      { src: '/images/projectA/tiger/tiger_3.webp', type: 'image' },
      { src: '/images/projectA/tiger/tiger_4.webp', type: 'image' },
      { src: '/images/projectA/tiger/tiger_5.mp4', type: 'video' },
      { src: '/images/projectA/tiger/tiger_6.webp', type: 'image' },
    ],
    mediaLinks: {
      5: 'https://upbit.com/nft/search?searchKeyword=%22%ED%95%9C%EC%B2%AD%22',
    },
    behanceLinks: [
      {
        url: 'https://www.youtube.com/watch?v=7V6hCDzVdNs',
        label: '한청 NFT — YouTube',
        thumbnail: '/images/projectA/tiger/tiger_thum.webp',
        hoverLabel: 'Watch on YouTube',
      },
    ],
  },
  {
    id: 'pulzz',
    name: 'Pulzz',
    category: 'projectA',
    categoryLabel: '3D Modeling',
    tags: ['Stylized', 'Character', 'Blender', 'Rendering'],
    description: '걷기 활동을 기록하고 위치 기반 디지털 에셋 카드를\n수집하는 헬스케어 앱 \'PULZZ\'의 디지털 에셋 카드 디자인을\n리드한 프로젝트다.\n\n첫 번째 시리즈는 한국의 고유 문화와 여행을 테마로 제작했다.\n스타일라이즈한 표현과 사실적인 렌더링을 접목해\n심미적으로 아름다운 비주얼을 구현하는 것이 목표였다.\n\n형태는 단순하게 유지하되, 실루엣 자체가 아름답게\n읽힐 수 있는 오브젝트를 만드는 데 집중했다.\n단순함 안에서 완성도를 끌어올리는 방향으로\n디자인의 기준을 잡고 작업했다.',
    thumbnail: { src: '/images/projectA/Pulzz/pulzz_4.webp', type: 'image' },
    media: [
      { src: '/images/projectA/Pulzz/pulzz_main.mp4', type: 'video' }, // 0
      { src: '/images/projectA/Pulzz/pulzz_1.mp4', type: 'video' },    // 1
      { src: '/images/projectA/Pulzz/pulzz_2.mp4', type: 'video' },    // 2
      { src: '/images/projectA/Pulzz/pulzz_3.webp', type: 'image' },    // 3
      { src: '/images/projectA/Pulzz/pulzz_4.webp', type: 'image' },    // 4
      { src: '/images/projectA/Pulzz/pulzz_5.webp', type: 'image' },    // 5
      { src: '/images/projectA/Pulzz/pulzz_6.webp', type: 'image' },    // 6
      { src: '/images/projectA/Pulzz/pulzz_7.webp', type: 'image' },    // 7
      { src: '/images/projectA/Pulzz/pulzz_8.webp', type: 'image' },    // 8
      { src: '/images/projectA/Pulzz/pulzz_9.webp', type: 'image' },    // 9
      { src: '/images/projectA/Pulzz/pulzz_10.webp', type: 'image' },   // 10
      { src: '/images/projectA/Pulzz/pulzz_11.webp', type: 'image' },   // 11
      { src: '/images/projectA/Pulzz/pulzz_12.webp', type: 'image' },   // 12
      { src: '/images/projectA/Pulzz/pulzz_13.webp', type: 'image' },   // 13
      { src: '/images/projectA/Pulzz/pulzz_14.webp', type: 'image' },   // 14
      { src: '/images/projectA/Pulzz/pulzz_15.webp', type: 'image' },   // 15
      { src: '/images/projectA/Pulzz/pulzz_16.webp', type: 'image' },   // 16
      { src: '/images/projectA/Pulzz/pulzz_17.webp', type: 'image' },   // 17
      { src: '/images/projectA/Pulzz/pulzz_18.webp', type: 'image' },   // 18
    ],
    mediaLayout: [
      [0, 1, 2],      // main, 1, 2
      [3, 4],         // 3, 4
      [5, 6],         // 5, 6
      [7, 8],         // 7, 8
      [9, 10],        // 9, 10
      [11, 12],       // 11, 12
      [13, 14],       // 13, 14
      15, 16, 17, 18, // 15~18 full-width
    ],
    behanceLinks: [
      {
        url: 'https://www.behance.net/gallery/187989733/PULZZ-BXContent',
        label: 'PULZZ BX · Content',
        thumbnail: '/images/projectA/Pulzz/pulzz_thum.webp',
      },
    ],
  },
  // ─── Project B : AI & Web ─────────────────────────────────────────────────
  {
    id: 'ridy',
    name: 'Ridy',
    category: 'projectB',
    categoryLabel: 'Web & Service',
    tags: ['Web', 'Platform', 'UI/UX', 'Admin', 'Service Design', 'App Planning'],
    description:
      '배달 라이더를 위한 렌탈·정산·배달 통합 솔루션 플랫폼\n\'RIDY\'의 웹사이트 전체를 기획·개발·배포한 프로젝트다.\n\n서비스 소개 웹사이트를 비롯해 내부 운영을 위한\n어드민 페이지, 데이터 기반 의사결정을 지원하는\n애널리틱스 페이지까지 연동된 시스템 전체를 구축했다.\n\n개발에 앞서 모든 기능 정의, 정책, 정책에 따른 로직을\n하나의 MD 문서로 완성한 뒤 개발을 시작했다.\n파편화된 수정으로 인한 오류를 사전에 차단하고,\n웹사이트·어드민·애널리틱스가 일관된 구조로\n연동될 수 있도록 설계 단계에서 모든 기준을 세웠다.\n\n기획과 개발을 함께 주도한 프로젝트로,\n현재 실서비스로 배포되어 운영 중이다.',
    links: [
      { label: 'RIDY ↗', url: 'https://www.ridy.co.kr/' },
    ],
    thumbnail: { src: '/images/projectB/ridy/ridy_main.webp', type: 'image' },
    mediaLayout: [0, 1, 2, 3, 4, 5, 6, 7],
    media: [
      { src: '/images/projectB/ridy/ridy_1.webp', type: 'image', caption: '렌탈·정산·배달, 라이더를 위한 통합 솔루션의\n첫 화면.' },
      { src: '/images/projectB/ridy/ridy_2.webp', type: 'image', caption: '자주 쓰는 핵심 기능을 한 화면에서\n바로 접근할 수 있도록 설계한 서비스 허브다.' },
      { src: '/images/projectB/ridy/ridy_3.webp', type: 'image', caption: '웹과 모바일 환경 모두에서\n최적화된 레이아웃을 제공.' },
      { src: '/images/projectB/ridy/ridy_4.webp', type: 'image', caption: '렌탈 기종을 등록하고 관리하는\n운영자용 어드민 페이지.' },
      { src: '/images/projectB/ridy/ridy_5.webp', type: 'image', caption: '전국 서비스센터 정보를 등록하고\n관리할 수 있는 어드민 페이지.' },
      { src: '/images/projectB/ridy/ridy_6.webp', type: 'image', caption: '서비스 운영 데이터를 시각화해\n의사결정에 활용할 수 있도록 설계했다.' },
      { src: '/images/projectB/ridy/ridy_7.webp', type: 'image' },
      { src: '/images/projectB/ridy/ridy_8.webp', type: 'image', caption: '전체 기능 정의, 정책, 로직을 하나의 문서로 정리해\n개발 전 모든 기준을 세운 기획 문서.' },
    ],
  },
  {
    id: '2gathr',
    name: '2gathr',
    category: 'projectB',
    categoryLabel: 'Web & Service',
    tags: ['UI/UX', 'Platform', 'Service Design', 'Planning', 'Managing'],
    description:
      '타이탄 콘텐츠(엔터테인먼트)의 소속 아티스트를 위한\n자체 팬덤 플랫폼 \'2gathr\'의 UX/UI 디자인을 총괄하고 있는 프로젝트다.\n현재 타이탄 소속 그룹 앳하트(At Heart)가 서비스 중이며,\n지속적인 업데이트 디자인을 지원하고 있다.\n\nFigma를 활용해 앱 내 컴포넌트 시스템을 직접 구축했으며,\n재사용 가능한 프로시저럴 구조로 설계해\n유지보수와 확장에 용이한 디자인 환경을 만들었다.\n\n기획과 개발 사이에서 매니징을 겸하며\n디자인이 실제 서비스로 구현되는 전 과정을 주도하고 있다.\n플랫폼 내 Piece NFT의 제작·발행·관리 또한 담당하고 있다.',
    links: [
      { label: 'App Store ↗', url: 'https://apps.apple.com/kr/app/2gathr-%ED%88%AC%EA%B2%8C%EB%8D%94/id6752650933' },
      { label: 'Google Play ↗', url: 'https://play.google.com/store/apps/details?id=com.titan.gathr&hl=ko' },
      { label: '2gathr ↗', url: 'https://apps.apple.com/kr/app/2gathr-%ED%88%AC%EA%B2%8C%EB%8D%94/id6752650933' },
    ],
    thumbnail: { src: '/images/projectB/2gathr/2gatur_main.webp', type: 'image' },
    mediaLayout: [
      [0, 1], [2, 3], [4, 5], [6, 7],
      {
        group: [[8, 10, 11, 14], [9, 12, 13, 17]],
        label: 'AtHeart × 2Gathr Character Piece',
        description: 'AtHeart 멤버 7인과 1:1 매칭된 강아지 캐릭터 — Michi(mimi) · Arin(arong) · Katelyn(keke) · Bome(chuni) · Seohyeun(mooni) · Nahyun(namong) · Aurora(tomo). 원화를 기반으로 카툰 렌더링 방식으로 모델링하고, 애니메이팅에 최적화된 리깅으로 완성한 Piece다. 2Gathr 런칭 오프닝 이벤트 시 welcome piece와 함께 팬들에게 제공되었으며, 굿즈·NFC 등 다양한 사업 확장에 활용될 수 있도록 전 7종을 세팅해 두었다.',
      },
      {
        group: [[15, 16]],
        label: 'Opening Animation',
        description: '2Gathr 최초 런칭 당시 팬 오프닝 이벤트로 제공된 Piece 오픈 애니메이션.',
      },
    ],
    media: [
      { src: '/images/projectB/2gathr/2gatur_1.webp', type: 'image' },         // 0
      { src: '/images/projectB/2gathr/2gatur_2.webp', type: 'image' },         // 1
      { src: '/images/projectB/2gathr/2gatur_3.webp', type: 'image' },         // 2
      { src: '/images/projectB/2gathr/2gatur_4.webp', type: 'image' },         // 3
      { src: '/images/projectB/2gathr/2gatur_5.webp', type: 'image' },         // 4
      { src: '/images/projectB/2gathr/2gatur_6.webp', type: 'image' },         // 5
      { src: '/images/projectB/2gathr/2gatur_7.webp', type: 'image' },         // 6
      { src: '/images/projectB/2gathr/2gatur_8.webp', type: 'image' },         // 7
      // Piece characters: mimi, arong, keke, chuni, tomo, mooni, namong
      { src: '/images/projectB/2gathr/mimi_piece.mp4', type: 'video' },       // 8
      { src: '/images/projectB/2gathr/arong_piece.mp4', type: 'video' },      // 9
      { src: '/images/projectB/2gathr/keke_piece.mp4', type: 'video' },       // 10
      { src: '/images/projectB/2gathr/chuni_piece.mp4', type: 'video' },      // 11
      { src: '/images/projectB/2gathr/tomo_piece.mp4', type: 'video' },       // 12
      { src: '/images/projectB/2gathr/mooni_piece.mp4', type: 'video' },      // 13
      { src: '/images/projectB/2gathr/namong_piece.mp4', type: 'video' },     // 14
      // Opening animations
      { src: '/images/projectB/2gathr/i&_piece open animation2.mp4', type: 'video' },  // 15
      { src: '/images/projectB/2gathr/open animation.mp4', type: 'video' },            // 16
      { src: '/images/projectB/2gathr/welcome_piece.mp4', type: 'video' },             // 17
    ],
  },
  // ─── Project C : Visual ───────────────────────────────────────────────────
  {
    id: 'oille-room',
    name: 'Oille Room',
    category: 'projectC',
    categoryLabel: 'Visual',
    tags: ['Environment', 'Scene', 'Retro', 'Blender', 'Substance Painter'],
    description:
      'SUPRA NFT 프로젝트의 로드맵 씬으로 기획된 3D 작업이다.\n새로운 NFT가 업데이트될 때마다 올리의 방 안에\n새로운 신발 상자가 등장하고, 일정 시간이 지나면\n해당 NFT가 공개되는 방식으로 로드맵이 진행될 예정이었다.\n\n17살 소년 올리의 방을 컨셉으로, 80~90년대의 감성을\n최대한 사실적으로 재현하는 것이 핵심이었다.\n그 시대에 유행했던 아이템과 소품들을 수없이 리서치하며\n씬 안에 하나하나 직접 모델링해 채워넣었다.\n외부 에셋에 의존하지 않고 대부분을 직접 제작했기에\n파일이 무거워지는 고충도 있었지만,\n원하는 것들을 온전히 담아낼 수 있었던 작업이다.\n\n스케이트보딩과 청춘의 감성을 3D 공간으로 옮긴,\n개인적으로도 특별히 기억에 남는 프로젝트다.',
    thumbnail: { src: '/images/projectC/oille-room/oille-room_main.webp', type: 'image' },
    media: [
      { src: '/images/projectC/oille-room/oille-room_1.webp', type: 'image' },  // 0
      { src: '/images/projectC/oille-room/oille-room_2.webp', type: 'image' },  // 1
      { src: '/images/projectC/oille-room/oille-room_3.webp', type: 'image' },  // 2
      { src: '/images/projectC/oille-room/oille-room_4.webp', type: 'image' },  // 3
      { src: '/images/projectC/oille-room/asset_1.webp', type: 'image' },         // 4
      { src: '/images/projectC/oille-room/asset_2.webp', type: 'image' },         // 5
      { src: '/images/projectC/oille-room/asset_3.webp', type: 'image' },         // 6
      { src: '/images/projectC/oille-room/asset_4.webp', type: 'image' },         // 7
      { src: '/images/projectC/oille-room/asset_5.webp', type: 'image' },         // 8
      { src: '/images/projectC/oille-room/asset_6.webp', type: 'image' },         // 9
      { src: '/images/projectC/oille-room/asset_7.webp', type: 'image' },         // 10
      { src: '/images/projectC/oille-room/asset_8.webp', type: 'image' },         // 11
      { src: '/images/projectC/oille-room/asset_9.webp', type: 'image' },         // 12
      { src: '/images/projectC/oille-room/asset_10.webp', type: 'image' },        // 13
      { src: '/images/projectC/oille-room/asset_11.webp', type: 'image' },        // 14
      { src: '/images/projectC/oille-room/asset_12.webp', type: 'image' },        // 15
    ],
    mediaLayout: [
      [4, 5, 6],
      [7, 8, 9],
      [10, 11, 12],
      [13, 14, 15],
      0, 1, 2, 3,
    ],
    behanceLinks: [
      {
        url: 'https://www.behance.net/gallery/168093561/SUPRA-X-CYPHRLY',
        label: 'SUPRA X CYPHRLY',
        thumbnail: '/images/projectC/oille-room/oille-room_thum.webp',
      },
    ],
  },
  {
    id: 'hideout',
    name: 'Hideout',
    category: 'projectC',
    categoryLabel: 'Visual',
    tags: ['Environment', 'Scene', 'Blender', 'Substance Painter', 'Rendering'],
    description:
      '올리의 방 작업 이후, 빠른 씬 세팅 능력을 점검하기 위해\n진행한 개인 프로젝트다.\n\n버려진 지하 아지트를 컨셉으로,\n친한 친구들끼리 게임, 개발, 식사를 함께하던\n자기들만의 공간이 시간이 흘러 폐허가 된 모습을 상상해 제작했다.\n\n녹이 슬고 먼지가 쌓인 오브젝트들,\n어둠 속에서 살아있는 라이팅으로\n공간이 가진 시간의 흔적을 표현하는 데 집중했다.\n다양한 에셋을 활용해 빠르게 세팅하고\n라이팅까지 완성하는 것이 이 작업의 핵심 목표였다.',
    thumbnail: { src: '/images/projectC/hideout/hideout_main.webp', type: 'image' },
    mediaLayout: [[0, 1], 2, 3, 4],
    media: [
      { src: '/images/projectC/hideout/hideout_1.webp', type: 'image' },
      { src: '/images/projectC/hideout/hideout_2.webp', type: 'image' },
      { src: '/images/projectC/hideout/hideout_3.webp', type: 'image' },
      { src: '/images/projectC/hideout/hideout_4.webp', type: 'image' },
      { src: '/images/projectC/hideout/hideout_5.webp', type: 'image' },
    ],
  },
];
