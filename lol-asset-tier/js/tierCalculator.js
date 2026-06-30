// 질문 데이터 및 티어 판별 알고리즘 파일
(function() {
  const questions = [
    {
      id: 1,
      text: "현재 본인의 순자산(부채를 제외한 주식, 현금, 부동산 등 총자산) 규모는 어떻게 되시나요?",
      isHiddenFilter: true,
      options: [
        { text: "순자산 50억 원 이상", masterPass: "CHALLENGER" },
        { text: "순자산 15억 원 이상 50억 원 미만", masterPass: "GRANDMASTER" },
        { text: "순자산 5억 원 이상 15억 원 미만", score: 30 },
        { text: "순자산 1억 원 이상 5억 원 미만", score: 15 },
        { text: "순자산 1억 원 미만", score: 0 }
      ]
    },
    {
      id: 2,
      text: "친구가 '야, 이거 무조건 오르는 역대급 호재 구역이래'라며 카톡 방에 링크를 보냈다면?",
      options: [
        { text: "출처 어디야? 교통망 호재나 실거래가 데이터 즉시 검증 (분석파)", score: 12 },
        { text: "주말에 당장 현장으로 가본다. 백문이 불여일견 (행동파 임장러)", score: 12 },
        { text: "귀가 솔깃해서 일단 소액라도 담그거나 단톡방에 공유 (야수/귀얇음)", score: 4 },
        { text: "그런 정보가 나한테까지 올 리가 없지 쿨하게 패스 (회의주의자)", score: 0 }
      ]
    },
    {
      id: 3,
      text: "월급(또는 고정 수익)이 들어왔을 때 나의 자금 집행 우선순위는?",
      options: [
        { text: "이번 달 노릴 꿀매물이나 우량주 추매 자금으로 즉시 이체", score: 11 },
        { text: "예적금 비율 채우고, 대출 이자 내고 철저하게 계획 분배", score: 8 },
        { text: "고생한 나를 위한 보상(소비) 먼저, 남은 돈으로 투자", score: 3 },
        { text: "대출 이자와 원리금 갚느라 눈 깜짝할 새 스쳐 지나감", score: 6 }
      ]
    },
    {
      id: 4,
      text: "자산 투자 시장에서 내가 생각하는 '가장 공포스러운 최악의 상황'은?",
      options: [
        { text: "나만 빼고 주변 사람들이 다 돈 벌어서 '벼락거지' 되는 것 (FOMO)", score: 11 },
        { text: "내가 산 부동산이나 대장주 가격이 반토막 나는 것 (원금 손실 공포)", score: 5 },
        { text: "확실한 기회와 매물을 보고도 투자할 시드머니가 없는 것 (자금 부족)", score: 9 },
        { text: "사기꾼이나 잘못된 선동에 속아 돈을 날리는 것 (리스크 혐오)", score: 3 }
      ]
    },
    {
      id: 5,
      text: "부동산 상급지(강남 등) 진입이나 대장주 매수에 대한 내 생각은?",
      options: [
        { text: "영혼까지 끌어모아서(영끌)라도 젊을 때 무조건 진입해야 한다", score: 12 },
        { text: "수도권 유망 지역(송도, 청라, 판교 등) 개발 호재 있는 곳 위주로 실속 투자", score: 9 },
        { text: "지금은 거품이다. 무리하지 않고 내 페이스에 맞춰 스텝 바이 스텝", score: 5 },
        { text: "내 집 마련보다는 편하게 전월세 살면서 현금 굴리는 게 낫다", score: 1 }
      ]
    },
    {
      id: 6,
      text: "만약 공돈으로 현금 1억 원이 생긴다면 나의 행동은?",
      options: [
        { text: "수도권 소액 갭투자나 경매 매물을 매의 눈으로 찾아다닌다", score: 12 },
        { text: "미국 S&P500 ETF나 글로벌 우량주에 묻어두고 신경 끈다", score: 9 },
        { text: "파킹통장에 넣어두고 시장 타이밍을 재며 관망한다", score: 5 },
        { text: "변동성 화끈한 급등주나 코인에 던져 한탕 노린다", score: 2 }
      ]
    },
    {
      id: 7,
      text: "투자 관련 정보 단톡방(오픈채팅방)에서 나의 주된 포지션은?",
      options: [
        { text: "고급 정보나 팩트 뉴스 링크를 가장 먼저 물어다 주는 리포터", score: 11 },
        { text: "잘못된 찌라시가 올라오면 데이터와 팩트로 조목조목 반박하는 팩폭러", score: 11 },
        { text: "조용히 분석 글 정독하고 유익한 글에 하트/리액션만 하는 프로 눈팅러", score: 6 },
        { text: "시장 흔들릴 때 '멘탈 터지네요, 한강 가야 하나요' 리액션 담당", score: 2 }
      ]
    },
    {
      id: 8,
      text: "나만의 재테크 및 자산 운용 철학을 가장 잘 대변하는 문장은?",
      options: [
        { text: "무릎에 사서 어깨에 판다. 데이터 기반 정석 투자", score: 11 },
        { text: "잃지 않는 투자가 최고다. 안전 최우선 방어형 투자", score: 5 },
        { text: "인생은 한 방, 갈 때 가더라도 불꽃처럼 과감하게 지른다", score: 3 },
        { text: "철학이 어딨어, 시장 흐름과 감(Vibe)에 맡기는 바이브 투자", score: 7 }
      ]
    },
    {
      id: 9,
      text: "실거주 또는 투자용 부동산(집)을 고를 때 절대로 양보 못 하는 조건은?",
      options: [
        { text: "GTX나 핵심 지하철역이 도보 5분 이내인 '초역세권' (교통망)", score: 11 },
        { text: "향후 대규모 재건축이나 도시 인프라 개발 호재 (미래 가치)", score: 11 },
        { text: "대형 마트, 몰, 공원, 병원이 다 갖춰진 '슬세권' (인프라)", score: 6 },
        { text: "구축은 싫다, 무조건 쾌적하고 살기 좋은 신축 브랜드 대단지", score: 4 }
      ]
    }
  ];

  // 각 티어별 메타데이터 및 고품질 SVG 정의
  const tierDetails = {
    CHALLENGER: {
      name: "챌린저 (CHALLENGER)",
      title: "상위 0.01% 자산의 신",
      desc: "당신은 이미 자산 시장의 정점에 선 신입니다. 어떤 공포와 선동 속에서도 이성을 잃지 않으며, 본인의 자산 규모만으로도 시장을 지배할 수 있는 역량을 가졌습니다. 경제적 자유를 완전히 초월한 상태입니다.",
      bgColor: "linear-gradient(135deg, #1d0933 0%, #0a1128 100%)",
      glowColor: "rgba(0, 229, 255, 0.6)",
      textColor: "#00e5ff",
      svg: `
        <svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="glow-ch" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="gold-ch" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#ffe57f"/>
              <stop offset="50%" stop-color="#ffb300"/>
              <stop offset="100%" stop-color="#ff6f00"/>
            </linearGradient>
            <linearGradient id="metal-ch" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#00e5ff"/>
              <stop offset="50%" stop-color="#006064"/>
              <stop offset="100%" stop-color="#004d40"/>
            </linearGradient>
            <radialGradient id="gem-ch" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#e0f7fa"/>
              <stop offset="50%" stop-color="#00e5ff"/>
              <stop offset="100%" stop-color="#01579b"/>
            </radialGradient>
          </defs>
          <!-- 날개 장식 -->
          <path d="M40 70 L20 100 L45 130 L60 100 Z" fill="url(#metal-ch)" stroke="url(#gold-ch)" stroke-width="2" filter="url(#glow-ch)"/>
          <path d="M160 70 L180 100 L155 130 L140 100 Z" fill="url(#metal-ch)" stroke="url(#gold-ch)" stroke-width="2" filter="url(#glow-ch)"/>
          <path d="M30 50 L10 80 L35 110 Z" fill="url(#metal-ch)" opacity="0.7"/>
          <path d="M170 50 L190 80 L165 110 Z" fill="url(#metal-ch)" opacity="0.7"/>
          <!-- 메인 방패 프레임 -->
          <path d="M100 25 L150 65 L140 135 L100 175 L60 135 L50 65 Z" fill="#0c192e" stroke="url(#gold-ch)" stroke-width="3" filter="url(#glow-ch)"/>
          <!-- 내부 겹장식 -->
          <path d="M100 40 L135 70 L127 125 L100 155 L73 125 L65 70 Z" fill="#13233f" stroke="url(#metal-ch)" stroke-width="2"/>
          <!-- 챌린저 왕관 상단 장식 -->
          <path d="M80 15 L100 30 L120 15 L105 40 L95 40 Z" fill="url(#gold-ch)" filter="url(#glow-ch)"/>
          <!-- 중앙 원형 엠블럼 -->
          <circle cx="100" cy="100" r="28" fill="url(#gem-ch)" stroke="#fff" stroke-width="2" filter="url(#glow-ch)"/>
          <!-- 보석 반사광 -->
          <path d="M90 88 Q100 80 112 88 Q100 95 90 88 Z" fill="#fff" opacity="0.6"/>
          <!-- 하단 날개깃 포인트 -->
          <path d="M85 160 L100 185 L115 160 Z" fill="url(#gold-ch)"/>
        </svg>
      `
    },
    GRANDMASTER: {
      name: "그랜드마스터 (GRANDMASTER)",
      title: "냉혹하고 강력한 자산의 지배자",
      desc: "당신은 강력한 자본력과 날카로운 직관을 가진 지배자입니다. 위기에 베팅할 줄 알며 시장의 흔들림을 역이용하여 큰 부를 거머쥐는 강인한 야수성을 갖추고 있습니다.",
      bgColor: "linear-gradient(135deg, #2c0808 0%, #0d0c10 100%)",
      glowColor: "rgba(255, 23, 68, 0.6)",
      textColor: "#ff1744",
      svg: `
        <svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="glow-gm" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="ruby-gm" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#ff5252"/>
              <stop offset="50%" stop-color="#ff1744"/>
              <stop offset="100%" stop-color="#b71c1c"/>
            </linearGradient>
            <linearGradient id="metal-gm" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#cfd8dc"/>
              <stop offset="50%" stop-color="#78909c"/>
              <stop offset="100%" stop-color="#37474f"/>
            </linearGradient>
            <linearGradient id="gold-gm" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#ffe082"/>
              <stop offset="100%" stop-color="#ffb300"/>
            </linearGradient>
          </defs>
          <!-- 날개 장식 (붉고 날카로운 스파이크) -->
          <path d="M45 60 L15 90 L40 120 L55 90 Z" fill="url(#ruby-gm)" stroke="url(#metal-gm)" stroke-width="1.5" filter="url(#glow-gm)"/>
          <path d="M155 60 L185 90 L160 120 L145 90 Z" fill="url(#ruby-gm)" stroke="url(#metal-gm)" stroke-width="1.5" filter="url(#glow-gm)"/>
          <!-- 메인 방패 프레임 -->
          <path d="M100 30 L145 70 L135 140 L100 175 L65 140 L55 70 Z" fill="#1b1212" stroke="url(#metal-gm)" stroke-width="3" filter="url(#glow-gm)"/>
          <!-- 골드 포인트 테두리 -->
          <path d="M100 42 L132 72 L125 125 L100 152 L75 125 L68 72 Z" fill="#261717" stroke="url(#gold-gm)" stroke-width="2"/>
          <!-- 상단 뿔 장식 -->
          <path d="M85 20 L100 38 L115 20 L100 48 Z" fill="url(#ruby-gm)" filter="url(#glow-gm)"/>
          <!-- 중앙 적색 보석 -->
          <polygon points="100,70 125,100 100,130 75,100" fill="url(#ruby-gm)" stroke="#fff" stroke-width="1.5" filter="url(#glow-gm)"/>
          <!-- 하단 날카로운 앵커 -->
          <path d="M88 155 L100 180 L112 155 Z" fill="url(#metal-gm)"/>
        </svg>
      `
    },
    MASTER: {
      name: "마스터 (MASTER)",
      title: "통찰력을 갖춘 노련한 투자 분석가",
      desc: "당신은 뛰어난 데이터 해독력과 절제된 감정을 지닌 프로 투자자입니다. 탄탄한 시드머니와 리스크 관리 능력을 동시에 갖추고 있으며 시장을 냉정하게 관망하고 결정적 기회를 낚아챕니다.",
      bgColor: "linear-gradient(135deg, #1d072b 0%, #060913 100%)",
      glowColor: "rgba(224, 64, 251, 0.6)",
      textColor: "#e040fb",
      svg: `
        <svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="glow-m" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="purple-m" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#ea80fc"/>
              <stop offset="50%" stop-color="#e040fb"/>
              <stop offset="100%" stop-color="#aa00ff"/>
            </linearGradient>
            <linearGradient id="gold-m" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#f4ff81"/>
              <stop offset="100%" stop-color="#aeea00"/>
            </linearGradient>
          </defs>
          <!-- 날개 장식 -->
          <path d="M50 70 L30 100 L55 125 Z" fill="url(#purple-m)" opacity="0.6"/>
          <path d="M150 70 L170 100 L145 125 Z" fill="url(#purple-m)" opacity="0.6"/>
          <!-- 메인 방패 -->
          <path d="M100 35 L140 70 L132 135 L100 170 L68 135 L60 70 Z" fill="#140e1c" stroke="url(#purple-m)" stroke-width="2.5" filter="url(#glow-m)"/>
          <!-- 내부 겹장식 -->
          <path d="M100 48 L128 73 L122 122 L100 150 L78 122 L72 73 Z" fill="#1c0f2b" stroke="url(#gold-m)" stroke-width="1.5"/>
          <!-- 중앙 보석 (구체형) -->
          <circle cx="100" cy="100" r="22" fill="url(#purple-m)" stroke="#fff" stroke-width="1" filter="url(#glow-m)"/>
          <circle cx="93" cy="93" r="6" fill="#fff" opacity="0.5"/>
        </svg>
      `
    },
    DIAMOND: {
      name: "다이아몬드 (DIAMOND)",
      title: "단단하고 투명한 시장의 엘리트",
      desc: "당신은 안정감과 성장성을 황금비율로 다룰 줄 아는 명석한 투자자입니다. 트렌드를 잘 포착하며 부동산 상급지나 미국 대장주 등 알짜배기 매물을 고르는 감각이 뛰어납니다.",
      bgColor: "linear-gradient(135deg, #07233b 0%, #030a16 100%)",
      glowColor: "rgba(0, 229, 255, 0.5)",
      textColor: "#00e5ff",
      svg: `
        <svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="glow-d" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="dia-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#e0f7fa"/>
              <stop offset="50%" stop-color="#00e5ff"/>
              <stop offset="100%" stop-color="#0097a7"/>
            </linearGradient>
            <linearGradient id="silver-d" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#ffffff"/>
              <stop offset="100%" stop-color="#b0bec5"/>
            </linearGradient>
          </defs>
          <!-- 세련된 다이아몬드 날개 장식 -->
          <path d="M48 80 L25 100 L48 120 Z" fill="url(#dia-grad)" opacity="0.8" filter="url(#glow-d)"/>
          <path d="M152 80 L175 100 L152 120 Z" fill="url(#dia-grad)" opacity="0.8" filter="url(#glow-d)"/>
          <!-- 메인 방패 -->
          <path d="M100 35 L140 70 L130 135 L100 168 L70 135 L60 70 Z" fill="#0d1b2a" stroke="url(#silver-d)" stroke-width="2.5"/>
          <path d="M100 45 L130 73 L122 122 L100 150 L78 122 L70 73 Z" fill="#13273e" stroke="url(#dia-grad)" stroke-width="2" filter="url(#glow-d)"/>
          <!-- 중앙 다이아몬드 컷 보석 -->
          <polygon points="100,75 120,95 100,122 80,95" fill="url(#dia-grad)" stroke="#fff" stroke-width="1.5" filter="url(#glow-d)"/>
        </svg>
      `
    },
    EMERALD: {
      name: "에메랄드 (EMERALD)",
      title: "견고한 균형을 유지하는 자산 수호자",
      desc: "당신은 기회와 리스크 속에서 현명하게 줄타기를 하는 이성적인 투자자입니다. 트렌드와 본인의 페이스 사이에서 올바른 균형을 찾고 있으며, 무리한 배팅보다는 실리를 챙기는 스타일입니다.",
      bgColor: "linear-gradient(135deg, #05261d 0%, #030807 100%)",
      glowColor: "rgba(0, 230, 118, 0.5)",
      textColor: "#00e676",
      svg: `
        <svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="glow-e" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="eme-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#b9f6ca"/>
              <stop offset="50%" stop-color="#00e676"/>
              <stop offset="100%" stop-color="#00c853"/>
            </linearGradient>
            <linearGradient id="gold-e" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#ffe082"/>
              <stop offset="100%" stop-color="#ffb300"/>
            </linearGradient>
          </defs>
          <!-- 에메랄드 장식 -->
          <path d="M52 80 L35 100 L52 120 Z" fill="url(#eme-grad)" opacity="0.7"/>
          <path d="M148 80 L165 100 L148 120 Z" fill="url(#eme-grad)" opacity="0.7"/>
          <!-- 메인 방패 -->
          <path d="M100 38 L138 72 L128 135 L100 165 L72 135 L62 72 Z" fill="#081e18" stroke="url(#gold-e)" stroke-width="2"/>
          <path d="M100 48 L128 74 L120 124 L100 148 L80 124 L72 74 Z" fill="#0d2e24" stroke="url(#eme-grad)" stroke-width="1.5" filter="url(#glow-e)"/>
          <!-- 중앙 육각형 에메랄드 -->
          <polygon points="100,75 118,87 118,110 100,122 82,110 82,87" fill="url(#eme-grad)" stroke="#fff" stroke-width="1.5" filter="url(#glow-e)"/>
        </svg>
      `
    },
    PLATINUM: {
      name: "플래티넘 (PLATINUM)",
      title: "실력과 계획을 겸비한 우등생 투자자",
      desc: "당신은 안정성을 중요시하며 계획대로 뚜벅뚜벅 걸어가는 합리적 투자자입니다. 원금 손실을 극도로 경계하면서도 우량 자산 중심의 포트폴리오를 차근차근 구축하고 있습니다.",
      bgColor: "linear-gradient(135deg, #0f1c24 0%, #060913 100%)",
      glowColor: "rgba(128, 203, 196, 0.4)",
      textColor: "#80cbc4",
      svg: `
        <svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="plat-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#e0f2f1"/>
              <stop offset="50%" stop-color="#80cbc4"/>
              <stop offset="100%" stop-color="#4db6ac"/>
            </linearGradient>
            <linearGradient id="silver-p" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#eceff1"/>
              <stop offset="100%" stop-color="#90a4ae"/>
            </linearGradient>
          </defs>
          <!-- 메인 방패 -->
          <path d="M100 40 L135 72 L126 135 L100 162 L74 135 L65 72 Z" fill="#11181c" stroke="url(#silver-p)" stroke-width="2"/>
          <path d="M100 50 L126 74 L118 122 L100 146 L82 122 L74 74 Z" fill="#182329" stroke="url(#plat-grad)" stroke-width="1.5"/>
          <!-- 중앙 원형 다이얼 보석 -->
          <circle cx="100" cy="100" r="18" fill="url(#plat-grad)" stroke="#fff" stroke-width="1"/>
          <!-- 중앙 무늬 -->
          <path d="M100 88 L103 100 L115 100 L105 107 L109 119 L100 111 L91 119 L95 107 L85 100 L97 100 Z" fill="#fff" opacity="0.8"/>
        </svg>
      `
    },
    GOLD: {
      name: "골드 (GOLD)",
      title: "성공을 꿈꾸는 열정적인 기회주의자",
      desc: "당신은 기회 포착 능력이 강하고 한 방의 수익을 도모할 줄 아는 야심 찬 투자자입니다. 트렌드에 민감하며, 시장 정보에 활발하게 반응하고 기회를 놓치지 않기 위해 노력합니다.",
      bgColor: "linear-gradient(135deg, #2b210a 0%, #090806 100%)",
      glowColor: "rgba(255, 215, 0, 0.4)",
      textColor: "#ffd700",
      svg: `
        <svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="glow-g" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#fff59d"/>
              <stop offset="50%" stop-color="#fbc02d"/>
              <stop offset="100%" stop-color="#f57f17"/>
            </linearGradient>
          </defs>
          <!-- 메인 방패 -->
          <path d="M100 42 L135 72 L125 132 L100 160 L75 132 L65 72 Z" fill="#201a0e" stroke="url(#gold-grad)" stroke-width="2.5" filter="url(#glow-g)"/>
          <path d="M100 52 L125 73 L118 120 L100 144 L82 120 L75 73 Z" fill="#2b2110" stroke="url(#gold-grad)" stroke-width="1" opacity="0.8"/>
          <!-- 중앙 골드 코어 심볼 -->
          <polygon points="100,78 115,93 115,107 100,122 85,107 85,93" fill="url(#gold-grad)" stroke="#fff" stroke-width="1.5" filter="url(#glow-g)"/>
        </svg>
      `
    },
    SILVER: {
      name: "실버 (SILVER)",
      title: "안전을 우선하는 든든한 방어형 투자자",
      desc: "당신은 무모한 모험을 꺼리고 성실한 자금 계획과 대출 상환을 1순위로 두는 정석적 방어형 투자자입니다. 리스크를 지극히 혐오하지만 안정을 기반으로 성장을 도모합니다.",
      bgColor: "linear-gradient(135deg, #1b2029 0%, #0c0d10 100%)",
      glowColor: "rgba(176, 190, 197, 0.3)",
      textColor: "#b0bec5",
      svg: `
        <svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="silver-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#ffffff"/>
              <stop offset="50%" stop-color="#cfd8dc"/>
              <stop offset="100%" stop-color="#90a4ae"/>
            </linearGradient>
          </defs>
          <!-- 메인 방패 -->
          <path d="M100 45 L132 72 L124 130 L100 156 L76 130 L68 72 Z" fill="#14181f" stroke="url(#silver-grad)" stroke-width="2"/>
          <path d="M100 55 L122 74 L116 118 L100 140 L84 118 L78 74 Z" fill="#1e232d" stroke="url(#silver-grad)" stroke-width="1" opacity="0.6"/>
          <!-- 중앙 실버 원형 코어 -->
          <circle cx="100" cy="100" r="15" fill="url(#silver-grad)" stroke="#b0bec5" stroke-width="1"/>
          <circle cx="96" cy="96" r="4" fill="#fff" opacity="0.6"/>
        </svg>
      `
    },
    BRONZE: {
      name: "브론즈 (BRONZE)",
      title: "의욕은 넘치나 귀가 얇은 야수 꿈나무",
      desc: "당신은 대박 기회나 친구의 솔깃한 추천에 마음이 격하게 요동치는 충동적인 유형입니다. 마음은 행동파 임장러이나 자칫 찌라시나 FOMO에 말려 뇌동매매할 가능성이 있으니 이성을 챙겨야 합니다.",
      bgColor: "linear-gradient(135deg, #221510 0%, #0d0907 100%)",
      glowColor: "rgba(141, 110, 99, 0.3)",
      textColor: "#8d6e63",
      svg: `
        <svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bronze-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#d7ccc8"/>
              <stop offset="50%" stop-color="#8d6e63"/>
              <stop offset="100%" stop-color="#5d4037"/>
            </linearGradient>
          </defs>
          <!-- 메인 방패 -->
          <path d="M100 45 L130 72 L122 128 L100 152 L78 128 L70 72 Z" fill="#1a110e" stroke="url(#bronze-grad)" stroke-width="2"/>
          <!-- 중앙 삼각 코어 -->
          <polygon points="100,82 115,112 85,112" fill="url(#bronze-grad)" stroke="#8d6e63" stroke-width="1"/>
        </svg>
      `
    },
    IRON: {
      name: "아이언 (IRON)",
      title: "시장과 내외하는 냉소적인 아웃사이더",
      desc: "당신은 현재 자본 투자에 회의적이거나 투자 시장과 거리두기를 하고 있는 철벽 방어형 아웃사이더입니다. '내 집 마련이 굳이 필요할까?' 생각하며 소비 먼저 챙기는 성향이 짙습니다.",
      bgColor: "linear-gradient(135deg, #15181c 0%, #0a0b0d 100%)",
      glowColor: "rgba(120, 144, 156, 0.2)",
      textColor: "#78909c",
      svg: `
        <svg viewBox="0 0 200 200" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="iron-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#cfd8dc"/>
              <stop offset="50%" stop-color="#78909c"/>
              <stop offset="100%" stop-color="#455a64"/>
            </linearGradient>
          </defs>
          <!-- 메인 방패 (투박하고 튼튼한 무쇠 느낌) -->
          <path d="M100 48 L128 72 L120 126 L100 148 L80 126 L72 72 Z" fill="#121417" stroke="url(#iron-grad)" stroke-width="2"/>
          <!-- 리벳 못 장식 -->
          <circle cx="78" cy="78" r="2" fill="#78909c"/>
          <circle cx="122" cy="78" r="2" fill="#78909c"/>
          <circle cx="100" cy="140" r="2" fill="#78909c"/>
          <!-- 중앙 무쇠 사각형 코어 -->
          <rect x="88" y="88" width="24" height="24" rx="2" fill="url(#iron-grad)" stroke="#455a64" stroke-width="1"/>
        </svg>
      `
    }
  };

  // 점수 계산 및 티어 매칭 함수
  function calculateTier(selectedIndices) {
    // 1번 질문 선택 옵션 가져오기
    const q1AnswerIdx = selectedIndices[0];
    const q1Option = questions[0].options[q1AnswerIdx];

    // [우선순위 1]: masterPass 검사
    if (q1Option && q1Option.masterPass) {
      const tierKey = q1Option.masterPass;
      return {
        tier: tierKey,
        score: null, // 마스터패스는 점수 누적 무관
        details: tierDetails[tierKey]
      };
    }

    // [우선순위 2]: 스코어 누적 합산 (1번~9번 질문 전체)
    let totalScore = 0;
    for (let i = 0; i < questions.length; i++) {
      const answerIdx = selectedIndices[i];
      if (answerIdx !== undefined && answerIdx !== null) {
        const option = questions[i].options[answerIdx];
        if (option && typeof option.score === 'number') {
          totalScore += option.score;
        }
      }
    }

    // [우선순위 3]: 최종 totalScore 구간에 따라 티어 매칭
    let tierKey = "IRON";
    if (totalScore >= 85) {
      tierKey = "MASTER";
    } else if (totalScore >= 70) {
      tierKey = "DIAMOND";
    } else if (totalScore >= 55) {
      tierKey = "EMERALD";
    } else if (totalScore >= 42) {
      tierKey = "PLATINUM";
    } else if (totalScore >= 30) {
      tierKey = "GOLD";
    } else if (totalScore >= 20) {
      tierKey = "SILVER";
    } else if (totalScore >= 10) {
      tierKey = "BRONZE";
    } else {
      tierKey = "IRON";
    }

    return {
      tier: tierKey,
      score: totalScore,
      details: tierDetails[tierKey]
    };
  }

  // 글로벌 윈도우 객체에 등록
  window.LolAssetTier = {
    questions: questions,
    tierDetails: tierDetails,
    calculateTier: calculateTier
  };
})();
