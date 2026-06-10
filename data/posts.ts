export interface Post {
  id: string;
  title: string;
  description: string;
  content: string[];
  translation: string[];
  tags: string[];
  readTime: string;
}

export const posts: Post[] = [
  {
    id: "1",
    title: "The Elasticity of Memory",
    description:
      "How our brains rewrite the past every time we recall it, and what that means for the stories we tell ourselves.",
    content: [
      "For centuries, memory was conceived of as a vast storehouse — a static archive where past experiences were filed away, intact and immutable, awaiting retrieval. This archival metaphor has proven remarkably persistent, shaping everything from legal testimony to our most intimate sense of self. Yet a growing body of cognitive research has fundamentally challenged this view, revealing memory to be not a recording but a construction, assembled anew each time we reach for it.",
      "The mechanism underlying this reconstructive process is known as reconsolidation. When a memory is retrieved, it enters a labile, or unstable, state, during which it can be modified, strengthened, or weakened before being stored again. Neuroscientific studies have demonstrated that inhibiting the reconsolidation of a fearful memory in rodents can effectively erase its emotional charge, opening speculative avenues for treating conditions such as post-traumatic stress disorder.",
      "But the malleability of memory also carries sobering implications for everyday life. Our confidence in the accuracy of a recollection bears no reliable correlation to its factual veracity. The very act of rehearsing a memory — of telling a favorite story from childhood at family gatherings — subtly reshapes it, privileging narrative coherence over historical precision. Over time, we become the authors of our own past, which may explain why two siblings can emerge from the same household with radically different accounts of their shared upbringing.",
      "What emerges from this research is not an indictment of memory's fallibility but an invitation to reconsider its purpose. Perhaps memory evolved not to preserve a faithful record of the past but to furnish a usable one — a repository of experience optimized not for accuracy but for survival. In this light, the elasticity of memory is not a design flaw but a feature, one that allows us to adapt, reinterpret, and ultimately integrate the past into a coherent and evolving sense of self.",
    ],
    translation: [
      "수세기 동안 기억은 거대한 저장소로 여겨졌다. 과거 경험이 손상되지 않고 불변하게 보관되어 인출되기만을 기다리는 정적인 아카이브였다. 이 아카이브 은유는 놀랍도록 지속성을 보여주며, 법적 증언에서부터 우리의 가장 내밀한 자아감에 이르기까지 모든 것을 형성해왔다. 그러나 점증하는 인지 연구는 이러한 관점에 근본적으로 도전하며, 기억이 녹음이 아니라 구성(construction)이며, 우리가 그것을 찾을 때마다 새롭게 조립된다는 것을 밝혀내고 있다.",
      "이 재구성 과정의 기저 메커니즘은 재고화(reconsolidation)로 알려져 있다. 기억이 인출되면 그것은 불안정한 상태에 들어가며, 그 동안 기억은 다시 저장되기 전에 수정, 강화 또는 약화될 수 있다. 신경과학 연구는 설치류의 공포 기억 재고화를 억제함으로써 감정적 충격을 효과적으로 지울 수 있음을 입증했으며, 이는 외상 후 스트레스 장애와 같은 상태를 치료할 수 있는 새로운 가능성을 열어준다.",
      "하지만 기억의 가소성은 일상생활에 대한 냉정한 시사점도 함께 제시한다. 회상의 정확성에 대한 우리의 확신은 그것의 사실적 진실성과 신뢰할 만한 상관관계를 갖지 않는다. 기억을 되풀이하는 행위 자체 — 가족 모임에서 어린 시절의 좋아하는 이야기를 들려주는 것 — 은 그것을 미묘하게 재구성하며, 역사적 정밀성보다 서사적 일관성을 우선시한다. 시간이 지남에 따라 우리는 우리 자신의 과거의 저자가 되며, 이것이 같은 가정에서 자란 두 형제자매가 완전히 다른 방식으로 자신들의 성장기를 이야기하는 이유를 설명해줄 수 있다.",
      "이 연구가 제시하는 것은 기억의 불완전성에 대한 비난이 아니라 그 목적을 재고하라는 초대이다. 아마도 기억은 과거의 충실한 기록을 보존하기 위해서가 아니라 유용한 기록 — 정확성이 아니라 생존을 위해 최적화된 경험의 저장소 — 을 제공하기 위해 진화했을 것이다. 이러한 관점에서 기억의 탄력성은 설계 결함이 아니라 특징이며, 그것은 우리가 과거를 적응하고 재해석하며 궁극적으로는 일관되고 진화하는 자아감 속으로 통합할 수 있게 해준다.",
    ],
    tags: ["#심리학", "#인지과학"],
    readTime: "4 min read",
  },
  {
    id: "2",
    title: "The Silence That Speaks",
    description:
      "What ancient philosophy teaches us about the limits of language — and the wisdom of knowing when not to speak.",
    content: [
      "In the Western philosophical tradition, language has long been revered as the vehicle of reason — the medium through which truth is articulated, debated, and ultimately established. From the Platonic dialogues to the logical positivism of the twentieth century, the presumption has been that what can be said clearly can be known clearly, and that the boundaries of language are coterminous with the boundaries of thought.",
      "Yet a parallel countercurrent has accompanied this tradition from its inception. Socrates, for all his dialectical prowess, famously professed to know nothing but his own ignorance. The apophatic theologians of the medieval period insisted that God could only be described in terms of what He is not, rather than what He is. And in the twentieth century, Ludwig Wittgenstein — who had earlier argued that language paints a picture of reality — concluded his later work with the arresting admonition: 'Whereof one cannot speak, thereof one must be silent.'",
      "This strand of thought finds its most radical expression not in the West, however, but in the Daoist and Chan Buddhist traditions of East Asia. The opening lines of the Daodejing declare that 'the Dao that can be told is not the eternal Dao.' Language here is not merely inadequate; it is an active obstacle, a framework that imposes artificial distinctions upon a reality that is fundamentally continuous and unnameable. The goal, accordingly, is not to refine one's language but to transcend it — to arrive at a form of knowing that is not mediated by concepts or categories.",
      "What unites these disparate traditions is a shared recognition that wisdom sometimes consists not in finding the right words but in recognizing the inadequacy of all words. In an age of endless commentary and performative opinion, this ancient insight has acquired a new urgency. The capacity for silence — for listening before speaking, for holding a question open rather than rushing to close it — may be among the most intellectually sophisticated and emotionally mature dispositions a person can cultivate.",
    ],
    translation: [
      "서양 철학 전통에서 언어는 오랫동안 이성의 수단으로 숭상되어 왔다. 진리가 명료화되고, 논쟁되며, 궁극적으로 확립되는 매체였다. 플라톤의 대화편에서 20세기 논리실증주의에 이르기까지, 명확하게 말할 수 있는 것은 명확하게 알 수 있으며, 언어의 경계는 사고의 경계와 일치한다는 가정이 지배해 왔다.",
      "그러나 이 전통과 나란히 평행한 역류가 처음부터 존재해 왔다. 소크라테스는 모든 변증법적 능력에도 불구하고, 자신은 자신의 무지 외에는 아무것도 알지 못한다고 유명하게 고백했다. 중세의 부정 신학자들은 신은 오직 '그가 아닌 것'으로만 설명될 수 있다고 주장했다. 그리고 20세기에 루트비히 비트겐슈타인 — 초기에는 언어가 현실의 그림을 그린다고 주장했던 — 은 그의 후기 저작을 '말할 수 없는 것에 대해서는 침묵해야 한다'는 충격적인 경고로 마무리했다.",
      "그러나 이러한 사고의 흐름은 서양이 아니라 동아시아의 도교와 선불교 전통에서 가장 급진적으로 표현된다. 도덕경의 첫 구절은 '도를 도라고 말할 수 있는 것은 영원한 도가 아니다'라고 선언한다. 언어는 여기서 단지 불충분할 뿐만 아니라 적극적인 장애물이며, 근본적으로 연속적이고 이름 붙일 수 없는 현실에 인위적인 구분을 강요하는 틀이다. 따라서 목표는 언어를 정제하는 것이 아니라 그것을 초월하는 것 — 개념이나 범주에 의해 매개되지 않는 앎의 형태에 도달하는 것 — 이다.",
      "이렇게 이질적인 전통들을 하나로 묶는 것은 때로 지혜가 올바른 말을 찾는 것이 아니라 모든 말의 부적절함을 인식하는 데 있다는 공유된 인식이다. 끝없는 논평과 과시적 의견의 시대에, 이 고대의 통찰은 새로운 긴급성을 획득했다. 침묵의 능력 — 말하기 전에 듣기, 질문을 성급히 닫지 않고 열어두기 — 은 사람이 기를 수 있는 가장 지적으로 정교하고 정서적으로 성숙한 태도 중 하나일지도 모른다.",
    ],
    tags: ["#철학", "#동양철학"],
    readTime: "5 min read",
  },
  {
    id: "3",
    title: "The Quantum Bridge",
    description:
      "How the strange logic of the quantum world is being harnessed to build computers that think in probabilities.",
    content: [
      "In the spring of 1981, a group of physicists and computer scientists gathered at MIT for a conference that would quietly plant the seeds of a technological revolution. Among them was Richard Feynman, who posed a deceptively simple question: if the physical world is fundamentally quantum mechanical, why are we trying to simulate it with classical computers that obey classical logic? His answer — that we would need a computer that itself operates on quantum principles — is now recognized as the founding insight of quantum computing.",
      "The difference between a classical and a quantum computer can be stated with elegant concision. A classical bit exists in one of two discrete states — 0 or 1. A quantum bit, or qubit, can exist in a superposition of both states simultaneously, until the moment it is measured. This property, combined with quantum entanglement — the eerie connection that links particles across distance — enables quantum computers to explore vast landscapes of possible solutions in parallel, rather than sequentially as classical machines must.",
      "For years, quantum computing remained a theoretical curiosity, hindered by the formidable challenge of maintaining coherence — the fragile quantum state that collapses the moment it interacts with its environment. But recent breakthroughs have transformed the landscape. Superconducting circuits, trapped ions, and topological qubits have all emerged as viable platforms, and companies such as Google, IBM, and a growing ecosystem of startups have demonstrated devices that perform specialized calculations beyond the reach of any classical supercomputer.",
      "Yet the quantum revolution will not arrive all at once. The current era — sometimes called the NISQ (Noisy Intermediate-Scale Quantum) era — is characterized by machines powerful enough to demonstrate quantum advantage but too error-prone for sustained, general-purpose computation. The path forward requires not only better hardware but also quantum error correction, a technique that encodes a single logical qubit across many physical qubits to protect against decoherence. When that threshold is crossed, the implications will extend beyond computation to cryptography, materials science, drug discovery, and our fundamental understanding of what it means to compute.",
    ],
    translation: [
      "1981년 봄, 물리학자들과 컴퓨터 과학자들이 MIT에 모여 한 기술 혁명의 씨앗을 조용히 심었을 컨퍼런스를 열었다. 그 중에는 리처드 파인만이 있었는데, 그는 기만적으로 단순한 질문을 던졌다: 물리적 세계가 근본적으로 양자역학적이라면, 왜 우리는 고전적 논리를 따르는 고전적 컴퓨터로 그것을 시뮬레이션하려는가? 그의 대답 — 양자 원리 자체로 작동하는 컴퓨터가 필요할 것이라는 — 은 이제 양자 컴퓨팅의 창시적 통찰로 인정받고 있다.",
      "고전 컴퓨터와 양자 컴퓨터의 차이는 우아하게 간결하게 설명될 수 있다. 고전적 비트는 0 또는 1이라는 두 개의 이산적 상태 중 하나에 존재한다. 양자 비트, 즉 큐비트는 측정되는 순간까지 두 상태의 중첩에 동시에 존재할 수 있다. 이 특성은 양자 얽힘 — 입자들을 거리를 넘어 연결하는 섬뜩한 관계 — 과 결합되어 양자 컴퓨터가 고전 기계처럼 순차적으로가 아니라 병렬로 방대한 가능한 해결책의 영역을 탐색할 수 있게 한다.",
      "수년 동안 양자 컴퓨팅은 이론적 호기심에 머물러 있었으며, 결맞음(coherence) — 환경과 상호작용하는 순간 붕괴되는 취약한 양자 상태 — 을 유지해야 하는 엄청난 도전에 의해 방해받았다. 그러나 최근의 돌파구가 환경을 변화시켰다. 초전도 회로, 포획 이온, 위상 큐비트 모두 실행 가능한 플랫폼으로 등장했으며, Google, IBM 및 성장하는 스타트업 생태계는 어떤 고전적 슈퍼컴퓨터도 따라올 수 없는 특수 계산을 수행하는 장치를 시연했다.",
      "그러나 양자 혁명이 한 번에 도래하지는 않을 것이다. 현재의 시대 — 때로 NISQ(Noisy Intermediate-Scale Quantum) 시대로 불리는 — 는 양자 우월성을 입증할 만큼 강력하지만 지속적인 범용 계산에는 너무 오류가 많은 기계들이 특징이다. 앞으로의 길은 더 나은 하드웨어뿐만 아니라 양자 오류 정정 — 결어긋남(decoherence)으로부터 보호하기 위해 많은 물리적 큐비트에 걸쳐 단일 논리 큐비트를 인코딩하는 기술 — 을 필요로 한다. 그 임계점이 넘어서면, 그 영향은 계산을 넘어 암호학, 재료 과학, 신약 개발, 그리고 '계산한다는 것'의 의미에 대한 우리의 근본적 이해에까지 확장될 것이다.",
    ],
    tags: ["#과학", "#양자컴퓨팅"],
    readTime: "5 min read",
  },
];
