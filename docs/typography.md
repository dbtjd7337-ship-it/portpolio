# Typography & Font Style System

이 문서는 포트폴리오 사이트에서 사용되는 폰트 스타일을 정의하고, 일관된 디자인 시스템을 유지하기 위한 컴포넌트 가이드를 제공합니다.

## 1. About Me 섹션 폰트 스타일 분석

현재 `AboutMe.tsx`에서 추출된 주요 폰트 스타일 리스트입니다.

| 구분 | Tailwind Classes | 특징 |
|--|--|--|
| **메인 헤딩** | `text-5xl font-black tracking-tighter italic` | 섹션의 큰 제목 (예: ABOUT ME) |
| **카테고리 헤더** | `text-xs font-black text-zinc-500 uppercase tracking-[0.3em]` | Education, Experience 등의 소제목 |
| **항목 제목** | `text-base font-bold text-white` | 학교명, 회사명 |
| **항목 부제목** | `text-xs text-cyan-400 font-bold` | 학과명, 직무명 |
| **본문** | `text-zinc-400 leading-relaxed text-sm` | 설명 텍스트 |
| **모노 라벨** | `text-zinc-500 uppercase tracking-widest text-xs font-mono` | Born, Degree 등 레이블 |
| **모노 수치** | `text-white text-sm font-semibold font-mono` | 날짜, 연락처 등 데이터 |

## 2. 정의된 폰트 스타일 컴포넌트

UI의 일관성을 위해 다음과 같은 폰트 스타일 컴포넌트를 정의하여 사용합니다.

### 2.1. Display (Intro Level)
전체 사이트의 인트로 등 가장 강조되는 텍스트에 사용합니다.
- **Classes**: `text-6xl md:text-8xl font-black tracking-[-0.04em] leading-[1.0] uppercase`

### 2.2. Heading 1 (Section Level)
각 섹션의 메인 타이틀에 사용합니다.
- **Classes**: `text-5xl font-black tracking-tighter italic uppercase`

### 2.3. Heading 2 (Group Level)
섹션 내의 그룹핑된 항목 제목에 사용합니다.
- **Classes**: `text-xs font-black text-zinc-500 uppercase tracking-[0.3em]`

### 2.4. Body Text
일반적인 설명 및 본문 텍스트에 사용합니다.
- **Classes**: `text-sm text-zinc-400 leading-relaxed`

### 2.5. Mono Data (Technical Labels)
데이터, 코드, 정량적 수치를 표현할 때 사용합니다.
- **Classes**: `font-mono text-xs uppercase tracking-widest`

## 3. 구현 계획 (Proposed Implementation)

추후 `/src/components/common/Typography.tsx` 등의 파일을 생성하여 다음과 같이 컴포넌트화할 수 있습니다.

```tsx
export const Text = {
  Display: ({ children }: Props) => <h1 className="text-6xl md:text-8xl font-black tracking-[-0.04em] leading-[1.0] uppercase">{children}</h1>,
  Section: ({ children }: Props) => <h2 className="text-5xl font-black tracking-tighter italic uppercase">{children}</h2>,
  Category: ({ children }: Props) => <h3 className="text-xs font-black text-zinc-500 uppercase tracking-[0.3em]">{children}</h3>,
  Body: ({ children }: Props) => <p className="text-sm text-zinc-400 leading-relaxed">{children}</p>,
};
```
