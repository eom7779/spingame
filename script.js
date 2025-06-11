// DOM 요소 선택
const wheel = document.querySelector('.roulette-wheel');
const spinButton = document.getElementById('spinButton');
const resultText = document.querySelector('.result-text');

// 룰렛 섹션 데이터
const sections = [
    '금등어 진공1팩',
    '10% 할인',
    '맛보기 꼬막',
    '음료수 1개',
    '1천원할인권',
    '꽝, 한번더!'
];

// 룰렛이 회전 중인지 확인하는 변수
let isSpinning = false;

// 랜덤 각도 생성 함수
function getRandomDegree() {
    // 각 섹션은 60도씩 차지 (360도 / 6개 섹션)
    const sectionAngle = 360 / sections.length;
    // 랜덤한 섹션 선택 (0-5)
    const randomSection = Math.floor(Math.random() * sections.length);
    // 섹션의 중앙에 멈추도록 각도 조정
    return randomSection * sectionAngle + (sectionAngle / 2);
}

// 폭죽 효과 함수
function showConfetti() {
    // 여러 방향에서 폭죽 발사
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // 여러 방향에서 폭죽 발사
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
    }, 250);
}

// 룰렛 회전 함수
function spinWheel() {
    if (isSpinning) return;
    
    isSpinning = true;
    spinButton.disabled = true;
    resultText.textContent = '';

    // 랜덤 각도 계산 (5바퀴 + 랜덤 각도)
    const extraSpins = 5; // 추가 회전 수
    const randomDegree = getRandomDegree();
    const totalDegree = (360 * extraSpins) + randomDegree;

    // 룰렛 회전 애니메이션
    wheel.style.transform = `rotate(${totalDegree}deg)`;

    // 5초 후 결과 표시
    setTimeout(() => {
        isSpinning = false;
        spinButton.disabled = false;

        // 당첨된 섹션 계산
        const normalizedDegree = randomDegree % 360;
        const sectionIndex = Math.floor(normalizedDegree / (360 / sections.length));
        const prize = sections[sectionIndex];

        // 결과 표시
        resultText.textContent = `축하합니다! ${prize}에 당첨되셨습니다!`;
        
        // 폭죽 효과 표시
        showConfetti();
    }, 5000);
}

// 시작 버튼 이벤트 리스너
spinButton.addEventListener('click', spinWheel); 