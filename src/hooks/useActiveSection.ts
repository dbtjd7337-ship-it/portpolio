import { useState, useEffect, RefObject } from 'react';

/**
 * 가로 스크롤 컨테이너의 scrollLeft를 기준으로
 * 현재 활성 섹션 id를 반환한다.
 *
 * @param containerRef - 가로 스크롤이 발생하는 HTMLElement의 ref
 * @param sectionIds   - 순서대로 나열된 섹션 id 배열 (모듈 레벨 상수 권장)
 * @param threshold    - 감지 기준점 (0 ~ 1, 기본값 0.5)
 *                       0   = 시작점: 섹션의 왼쪽 끝이 뷰포트 왼쪽 끝에 도달할 때 active
 *                       0.5 = 중간점: 섹션의 왼쪽 끝이 뷰포트 중앙에 도달할 때 active
 *
 * 사용 예:
 *   const active = useActiveSection(containerRef, SECTIONS);          // 중간점 (기본)
 *   const active = useActiveSection(containerRef, SECTIONS, 0);       // 시작점
 *   const active = useActiveSection(containerRef, SECTIONS, 0.5);     // 중간점
 */
export const useActiveSection = (
  containerRef: RefObject<HTMLElement>,
  sectionIds: string[],
  threshold: number = 0.5,
): string => {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] ?? '');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const detect = () => {
      const scrollLeft = container.scrollLeft;
      // threshold 비율만큼 뷰포트 너비를 오프셋으로 더함
      // 0   → triggerPoint = scrollLeft           (시작점)
      // 0.5 → triggerPoint = scrollLeft + width/2 (중간점)
      const triggerPoint = scrollLeft + container.clientWidth * threshold;

      // sectionIds 순서대로 순회하며
      // offsetLeft가 triggerPoint 이하인 마지막 섹션을 활성으로 판정
      let detected = sectionIds[0] ?? '';

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetLeft <= triggerPoint) {
          detected = id;
        }
      }

      setActiveSection(detected);
    };

    container.addEventListener('scroll', detect, { passive: true });
    detect(); // 마운트 시 초기 섹션 감지

    return () => {
      container.removeEventListener('scroll', detect);
    };
  }, [containerRef, sectionIds, threshold]);

  return activeSection;
};
