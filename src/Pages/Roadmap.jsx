
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  addEdge,
  Background,
  Handle,
  MarkerType,
  Position,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Link } from 'react-router';
import MainLayout from '../components/layouts/MainLayout';

// All roadmap content and UI live in this file.
const STORAGE_KEY = 'codebit-roadmaps-v1';
const NODE_WIDTH = 248;
const NODE_HEIGHT = 112;

const dsaTopics = [
  {
    id: 'math',
    title: 'Mathematical Fundamentals',
    category: 'Foundation',
    description: 'Build confidence with basic mathematical problem solving.',
    concepts: ['Sum of N natural numbers', 'Factorial and Fibonacci', 'Count and reverse digits', 'Prime numbers and sieve', 'GCD and LCM', 'Fast exponentiation'],
    questions: ['Sum of first N numbers', 'Check whether a number is prime', 'Find GCD of two numbers', 'Count digits in an integer'],
    x: 400,
    y: 20,
  },
  {
    id: 'complexity',
    title: 'Time & Space Complexity',
    category: 'Foundation',
    description: 'Learn to compare algorithms before implementing them.',
    concepts: ['Big O, Omega and Theta', 'Constant, linear and logarithmic time', 'Nested loops', 'Auxiliary space', 'Recursion stack space'],
    questions: ['Analyze a nested loop', 'Compare linear and binary search', 'Estimate recursive space usage'],
    x: 400,
    y: 200,
  },
  {
    id: 'arrays',
    title: 'Arrays',
    category: 'Core DSA',
    description: 'Start with traversal and move into essential array patterns.',
    concepts: ['Traversal and in-place updates', 'Maximum and minimum', 'Prefix sums', 'Sorting basics', 'Frequency counting'],
    questions: ['Find the largest element', 'Move zeroes', 'Rotate an array', 'Find the missing number', 'Maximum subarray sum'],
    x: 400,
    y: 380,
  },
  {
    id: 'two-pointers',
    title: 'Two Pointers',
    category: 'Array Patterns',
    description: 'Solve problems by moving two indices intelligently.',
    concepts: ['Opposite-direction pointers', 'Same-direction pointers', 'Sorted array pair sums', 'In-place partitioning'],
    questions: ['Two Sum II', 'Remove duplicates from sorted array', 'Container With Most Water', '3Sum'],
    x: 30,
    y: 580,
  },
  {
    id: 'sliding-window',
    title: 'Sliding Window',
    category: 'Array Patterns',
    description: 'Maintain a moving range instead of recomputing every subarray.',
    concepts: ['Fixed-size windows', 'Variable-size windows', 'Window frequency maps'],
    questions: ['Maximum sum subarray of size K', 'Longest substring without repeating characters', 'Minimum size subarray sum'],
    x: 310,
    y: 580,
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    category: 'Array Patterns',
    description: 'Use sorted order and monotonic conditions to cut search space.',
    concepts: ['Lower and upper bounds', 'First and last occurrence', 'Search on answer', 'Rotated sorted arrays'],
    questions: ['Binary Search', 'Search in Rotated Sorted Array', 'First and Last Position', 'Koko Eating Bananas'],
    x: 590,
    y: 580,
  },
  {
    id: 'kadane',
    title: "Kadane's Algorithm",
    category: 'Array Patterns',
    description: 'Track the best subarray ending at the current index.',
    concepts: ['Maximum subarray', 'Local vs global optimum', 'Handling all-negative arrays'],
    questions: ['Maximum Subarray', 'Maximum Sum Circular Subarray'],
    x: 870,
    y: 580,
  },
  {
    id: 'strings-hashing',
    title: 'Strings & Hashing',
    category: 'Core DSA',
    description: 'Work with characters, counts, maps and sets.',
    concepts: ['String traversal', 'Character frequencies', 'Hash maps and sets', 'Prefix patterns'],
    questions: ['Valid Anagram', 'Valid Palindrome', 'Group Anagrams', 'Longest Consecutive Sequence'],
    x: 400,
    y: 790,
  },
  {
    id: 'recursion',
    title: 'Recursion & Backtracking',
    category: 'Core DSA',
    description: 'Break problems into smaller states and explore choices.',
    concepts: ['Base cases', 'Call stack', 'Include/exclude', 'Backtracking templates'],
    questions: ['Generate Subsets', 'Permutations', 'Combination Sum', 'N-Queens'],
    x: 400,
    y: 970,
  },
  {
    id: 'linked-list',
    title: 'Linked Lists',
    category: 'Data Structures',
    description: 'Manipulate nodes and references safely.',
    concepts: ['Singly and doubly linked lists', 'Slow and fast pointers', 'Reversal', 'Cycle detection'],
    questions: ['Reverse Linked List', 'Linked List Cycle', 'Merge Two Sorted Lists', 'Remove Nth Node From End'],
    x: 120,
    y: 1160,
  },
  {
    id: 'stack-queue',
    title: 'Stacks & Queues',
    category: 'Data Structures',
    description: 'Understand LIFO, FIFO and monotonic structures.',
    concepts: ['Stack and queue operations', 'Monotonic stack', 'Deque', 'Expression evaluation'],
    questions: ['Valid Parentheses', 'Daily Temperatures', 'Next Greater Element', 'Implement Queue Using Stacks'],
    x: 680,
    y: 1160,
  },
  {
    id: 'trees',
    title: 'Trees & BST',
    category: 'Data Structures',
    description: 'Explore hierarchical data with recursive traversals.',
    concepts: ['DFS traversals', 'Level-order traversal', 'Binary search trees', 'Height and diameter', 'Lowest common ancestor'],
    questions: ['Maximum Depth of Binary Tree', 'Binary Tree Level Order Traversal', 'Validate BST', 'Lowest Common Ancestor'],
    x: 400,
    y: 1350,
  },
  {
    id: 'heaps',
    title: 'Heaps',
    category: 'Advanced DSA',
    description: 'Retrieve the smallest or largest item efficiently.',
    concepts: ['Min-heap and max-heap', 'Priority queues', 'Top K patterns'],
    questions: ['Kth Largest Element', 'Top K Frequent Elements', 'Merge K Sorted Lists'],
    x: 120,
    y: 1540,
  },
  {
    id: 'graphs',
    title: 'Graphs',
    category: 'Advanced DSA',
    description: 'Model relationships and traverse connected structures.',
    concepts: ['Adjacency lists', 'BFS and DFS', 'Cycle detection', 'Topological sorting', 'Dijkstra basics'],
    questions: ['Number of Islands', 'Clone Graph', 'Course Schedule', 'Network Delay Time'],
    x: 680,
    y: 1540,
  },
  {
    id: 'dp',
    title: 'Dynamic Programming',
    category: 'Advanced DSA',
    description: 'Reuse solutions to overlapping subproblems.',
    concepts: ['Memoization', 'Tabulation', 'State transitions', '1D and 2D DP'],
    questions: ['Climbing Stairs', 'House Robber', 'Coin Change', 'Longest Increasing Subsequence'],
    x: 400,
    y: 1730,
  },
];

const roadmapLinks = [
  ['math', 'complexity'],
  ['complexity', 'arrays'],
  ['arrays', 'two-pointers'],
  ['arrays', 'sliding-window'],
  ['arrays', 'binary-search'],
  ['arrays', 'kadane'],
  ['two-pointers', 'strings-hashing'],
  ['sliding-window', 'strings-hashing'],
  ['binary-search', 'strings-hashing'],
  ['kadane', 'strings-hashing'],
  ['strings-hashing', 'recursion'],
  ['recursion', 'linked-list'],
  ['recursion', 'stack-queue'],
  ['linked-list', 'trees'],
  ['stack-queue', 'trees'],
  ['trees', 'heaps'],
  ['trees', 'graphs'],
  ['heaps', 'dp'],
  ['graphs', 'dp'],
];

const initialPersonalTopic = {
  id: 'my-start',
  title: 'My Interview Preparation',
  category: 'Personal',
  description: 'Select this node to edit your first topic.',
  concepts: ['Add your first concept'],
  questions: [],
};

function readSavedData() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return value && typeof value === 'object' ? value : {};
  } catch {
    return {};
  }
}

function createNode(topic, position, completed = false) {
  return {
    id: topic.id,
    type: 'roadmapTopic',
    position,
    data: { ...topic, completed },
    draggable: true,
  };
}

function createEdge(source, target) {
  return {
    id: `${source}-${target}`,
    source,
    target,
    type: 'smoothstep',
    style: { stroke: '#54728c', strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#54728c' },
  };
}

function TopicNode({ data, selected }) {
  return (
    <div
      className={`w-62 rounded-2xl border bg-[#101719]/95 px-4 py-4 text-left shadow-[0_12px_32px_rgba(0,0,0,0.22)] transition-colors ${
        selected
          ? 'border-cyan-300 ring-2 ring-cyan-400/20'
          : data.completed
            ? 'border-emerald-400/50'
            : 'border-slate-600/70 hover:border-cyan-400/50'
      }`}
    >
      <Handle type="target" position={Position.Top} className="h-2! w-2! border-0! bg-cyan-400!" />
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="truncate text-[10px] font-bold uppercase tracking-[0.15em] text-cyan-300">
          {data.category || 'Topic'}
        </span>
        <span className={`text-[10px] ${data.completed ? 'text-emerald-300' : 'text-slate-500'}`}>
          {data.completed ? 'Completed' : 'To learn'}
        </span>
      </div>
      <h3 className="text-sm font-bold leading-5 text-white">{data.title}</h3>
      <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-400">
        {data.description || 'Select to view concepts and questions.'}
      </p>
      <div className="mt-3 border-t border-white/10 pt-2 text-[11px] text-slate-400">
        {(data.concepts || []).length} concepts · {(data.questions || []).length} questions
      </div>
      <Handle type="source" position={Position.Bottom} className="h-2! w-2! border-0! bg-cyan-400!" />
    </div>
  );
}

const nodeTypes = { roadmapTopic: TopicNode };

function RoadmapContent() {
  const { zoomIn, zoomOut, fitView, setViewport } = useReactFlow();
  const [savedData] = useState(readSavedData);
  const [mode, setMode] = useState('dsa');
  const [completedTopics, setCompletedTopics] = useState(savedData.completedTopics || {});
  const [personalNodes, setPersonalNodes, onPersonalNodesChange] = useNodesState(
    Array.isArray(savedData.personalNodes)
      ? savedData.personalNodes
      : [createNode(initialPersonalTopic, { x: 350, y: 100 })]
  );
  const [personalEdges, setPersonalEdges, onPersonalEdgesChange] = useEdgesState(
    Array.isArray(savedData.personalEdges) ? savedData.personalEdges : []
  );
  const [selectedId, setSelectedId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(null);

  const predefinedNodes = useMemo(
    () =>
      dsaTopics.map((topic) =>
        createNode(topic, { x: topic.x, y: topic.y }, Boolean(completedTopics[topic.id]))
      ),
    [completedTopics]
  );

  const predefinedEdges = useMemo(
    () => roadmapLinks.map(([source, target]) => createEdge(source, target)),
    []
  );

  const activeNodes = mode === 'dsa' ? predefinedNodes : personalNodes;
  const activeEdges = mode === 'dsa' ? predefinedEdges : personalEdges;
  const selectedNode = activeNodes.find((node) => node.id === selectedId);
  const totalCompleted = activeNodes.filter((node) => node.data.completed).length;
  const completionPercentage = activeNodes.length
    ? Math.round((totalCompleted / activeNodes.length) * 100)
    : 0;

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ completedTopics, personalNodes, personalEdges })
      );
    } catch {
      // The roadmap still works when browser storage is unavailable.
    }
  }, [completedTopics, personalNodes, personalEdges]);

  const onConnect = useCallback(
    (connection) => {
      if (connection.source === connection.target) return;
      setPersonalEdges((edges) => addEdge(createEdge(connection.source, connection.target), edges));
    },
    [setPersonalEdges]
  );

  useEffect(() => {
    // Open at readable node size instead of shrinking the entire learning path.
    const frame = requestAnimationFrame(() => {
      setViewport({ x: 180, y: 55, zoom: 0.9 }, { duration: 0 });
    });
    return () => cancelAnimationFrame(frame);
  }, [mode, setViewport]);

  function switchMode(nextMode) {
    setMode(nextMode);
    setSelectedId(null);
    setIsEditing(false);
    setDraft(null);
  }

  function toggleCompleted() {
    if (!selectedNode) return;

    if (mode === 'dsa') {
      setCompletedTopics((previous) => ({
        ...previous,
        [selectedId]: !previous[selectedId],
      }));
      return;
    }

    setPersonalNodes((nodes) =>
      nodes.map((node) =>
        node.id === selectedId
          ? { ...node, data: { ...node.data, completed: !node.data.completed } }
          : node
      )
    );
  }

  function addTopic() {
    const id = `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const newNode = createNode(
      {
        id,
        title: 'New Topic',
        category: 'Personal',
        description: 'Describe what you want to study.',
        concepts: [],
        questions: [],
      },
      { x: 300 + (personalNodes.length % 3) * 280, y: 100 + personalNodes.length * 120 }
    );

    setPersonalNodes((nodes) => [...nodes, newNode]);
    setSelectedId(id);
    setDraft({ ...newNode.data, conceptsText: '', questionsText: '' });
    setIsEditing(true);
  }

  function startEditing() {
    if (!selectedNode || mode !== 'personal') return;
    setDraft({
      ...selectedNode.data,
      conceptsText: (selectedNode.data.concepts || []).join('\n'),
      questionsText: (selectedNode.data.questions || []).join('\n'),
    });
    setIsEditing(true);
  }

  function saveTopic() {
    if (!draft || !draft.title.trim()) return;

    const { conceptsText, questionsText, ...topicData } = draft;
    const updatedData = {
      ...topicData,
      title: draft.title.trim(),
      concepts: conceptsText.split('\n').map((item) => item.trim()).filter(Boolean),
      questions: questionsText.split('\n').map((item) => item.trim()).filter(Boolean),
    };

    setPersonalNodes((nodes) =>
      nodes.map((node) =>
        node.id === selectedId
          ? { ...node, data: updatedData }
          : node
      )
    );
    setIsEditing(false);
  }

  function deleteTopic() {
    if (!selectedId || mode !== 'personal') return;
    setPersonalNodes((nodes) => nodes.filter((node) => node.id !== selectedId));
    setPersonalEdges((edges) =>
      edges.filter((edge) => edge.source !== selectedId && edge.target !== selectedId)
    );
    setSelectedId(null);
    setIsEditing(false);
  }

  function resetPersonalRoadmap() {
    if (!window.confirm('Clear your personalized roadmap and start again?')) return;
    setPersonalNodes([createNode(initialPersonalTopic, { x: 350, y: 100 })]);
    setPersonalEdges([]);
    setSelectedId(null);
    setIsEditing(false);
  }


  return (
    <div className="text-white">
      <div className="mx-auto max-w-400 px-4 py-8 sm:px-6">
        
        <header className="relative mb-10 overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.035] p-6 sm:p-10 lg:p-12">
        {/* Background decoration */}
        <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-cyan-400/10 blur-[110px]" />
        <div className="pointer-events-none absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-sky-500/10 blur-[100px]" />

        <div className="relative z-10">
            <Link
            to="/"
            className="mb-10 inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition hover:border-cyan-400/40 hover:bg-white/10"
            >
            <span className="mr-2 text-cyan-300">←</span>
            Back to Home
            </Link>

            <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Left: Introduction */}
            <div>
                <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-400/[0.07] px-4 py-2">
                {/* <span className="h-2 w-2 rounded-full bg-cyan-400" /> */}
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
                    Your Learning Journey Starts Here
                </span>
                </div>

                <h1 className="max-w-3xl text-5xl font-black leading-[1.08] tracking-tight text-white sm:text-6xl xl:text-7xl">
                Your goals.
                <br />
                Your pace.
                <br />
                <span className="bg-linear-to-r from-cyan-300 via-sky-300 to-blue-400 bg-clip-text text-transparent">
                    Your roadmap.
                </span>
                </h1>

                <p className="mt-7 max-w-xl text-base leading-8 text-slate-300">
                Great developers aren't built overnight. Follow a structured
                DSA learning path, master important concepts, or design a
                personalized roadmap that grows with you.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                <a
                    href="#roadmap-workspace"
                    className="rounded-xl bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
                >
                    Explore Roadmaps
                </a>

                <a
                    href="#roadmap-workspace"
                    className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                    Build Your Own
                </a>
                </div>
            </div>

            {/* Right: Visual learning path */}
            <div className="relative mx-auto w-full max-w-md">
                <div className="absolute inset-8 rounded-full bg-cyan-400/10 blur-[65px]" />

                <div className="relative rounded-3xl border border-white/15 bg-[#07151b]/80 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">
                        The Journey
                    </p>
                    <h2 className="mt-2 text-xl font-bold text-white">
                        From Basics to Mastery
                    </h2>
                    </div>

                    <span className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs text-cyan-300">
                    DSA
                    </span>
                </div>

                <div className="relative space-y-4">
                    <div className="absolute bottom-6 left-4.75 top-6 w-px bg-linear-to-b from-cyan-400 via-sky-500 to-white/10" />

                    {[
                    {
                        number: "01",
                        title: "Build the Foundation",
                        description: "Mathematics and complexity",
                    },
                    {
                        number: "02",
                        title: "Master the Patterns",
                        description: "Arrays, strings and searching",
                    },
                    {
                        number: "03",
                        title: "Connect the Concepts",
                        description: "Trees, graphs and recursion",
                    },
                    {
                        number: "04",
                        title: "Become Interview Ready",
                        description: "Dynamic programming and revision",
                    },
                    ].map((step, index) => (
                    <div
                        key={step.number}
                        className="relative flex items-center gap-4"
                    >
                        <div
                        className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-xs font-bold ${
                            index === 0
                            ? "border-cyan-400 bg-cyan-400 text-slate-950"
                            : "border-cyan-400/30 bg-[#10232a] text-cyan-300"
                        }`}
                        >
                        {step.number}
                        </div>

                        <div className="flex-1 rounded-xl border border-white/10 bg-white/4.5 p-4 transition hover:border-cyan-400/40 hover:bg-white/7.5">
                        <h3 className="text-sm font-bold text-white">
                            {step.title}
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-slate-400">
                            {step.description}
                        </p>
                        </div>
                    </div>
                    ))}
                </div>

                <div className="mt-8 rounded-xl border border-cyan-400/15 bg-cyan-400/5.5 p-4 text-center">
                    <p className="text-sm font-semibold text-cyan-200">
                    One concept at a time. One step closer.
                    </p>
                </div>
                </div>
            </div>
            </div>

            {/* Bottom feature cards */}

            {/* <div className="mt-12 grid gap-4 border-t border-white/10 pt-8 md:grid-cols-3">
            {[
                {
                number: "01",
                title: "Structured Learning",
                description:
                    "Follow a thoughtfully designed path from fundamental concepts to advanced DSA.",
                },
                {
                number: "02",
                title: "Personalized Paths",
                description:
                    "Create your own roadmap, connect topics, and learn in the order that works for you.",
                },
                {
                number: "03",
                title: "Track Your Growth",
                description:
                    "Mark concepts as completed and see how far you've progressed in your preparation.",
                },
            ].map((feature) => (
                <div
                key={feature.number}
                className="group rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-white/6"
                >
                <span className="text-xs font-bold tracking-widest text-cyan-400">
                    {feature.number} / CODEBIT
                </span>

                <h3 className="mt-4 text-lg font-bold text-white">
                    {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                    {feature.description}
                </p>
                </div>
            ))}
            </div> */}
            
        </div>
        </header>

        <div id="roadmap-workspace" className="grid gap-4 lg:grid-cols-[255px_minmax(0,1fr)]">
          <aside className="h-fit rounded-2xl border border-white/10 bg-white/4.5 p-5 lg:sticky lg:top-5">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">
              Choose a roadmap
            </p>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => switchMode('dsa')}
                className={`w-full rounded-xl border p-3 text-left text-sm font-semibold transition ${
                  mode === 'dsa'
                    ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-200'
                    : 'border-transparent text-slate-300 hover:bg-white/5'
                }`}
              >
                DSA Roadmap
                <span className="mt-1 block text-xs font-normal text-slate-400">
                  CodeBit recommended path
                </span>
              </button>
              <button
                type="button"
                onClick={() => switchMode('personal')}
                className={`w-full rounded-xl border p-3 text-left text-sm font-semibold transition ${
                  mode === 'personal'
                    ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-200'
                    : 'border-transparent text-slate-300 hover:bg-white/5'
                }`}
              >
                My Roadmap
                <span className="mt-1 block text-xs font-normal text-slate-400">
                  Create your own learning path
                </span>
              </button>
            </div>

            <div className="mt-7 border-t border-white/10 pt-6">
              <div className="mb-3 flex items-center justify-between text-xs">
                <span className="text-slate-400">Learning progress</span>
                <span className="font-semibold text-cyan-300">{completionPercentage}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-cyan-400 transition-all"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-slate-500">
                {totalCompleted} of {activeNodes.length} topics completed
              </p>
            </div>

            {mode === 'personal' && (
              <div className="mt-6 space-y-2">
                <button
                  type="button"
                  onClick={addTopic}
                  className="w-full rounded-xl bg-cyan-400 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
                >
                  Add topic
                </button>
                <button
                  type="button"
                  onClick={resetPersonalRoadmap}
                  className="w-full rounded-xl border border-white/10 px-4 py-3 text-sm text-slate-300 hover:bg-white/5"
                >
                  Reset my roadmap
                </button>
                <p className="pt-2 text-xs leading-5 text-slate-500">
                  Drag nodes to rearrange. Drag between connection points to link topics.
                </p>
              </div>
            )}
          </aside>

          <section className="min-w-0 space-y-4">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
                <div>
                  <h2 className="text-lg font-bold">
                    {mode === 'dsa' ? 'Complete DSA Roadmap' : 'Personalized Roadmap'}
                  </h2>
                  <p className="mt-1 text-xs text-slate-400">
                    {mode === 'dsa'
                      ? 'Select any topic to explore its concepts and interview questions.'
                      : 'Add, connect and organize your own learning topics.'}
                  </p>
                </div>
                <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300">
                  {activeNodes.length} topics
                </span>
              </div>

              <div className="relative h-160 w-full sm:h-185">
                <div className="absolute right-4 top-4 z-10 flex items-center gap-1 rounded-xl border border-white/15 bg-[#101719]/95 p-1.5 shadow-xl">
                  <button type="button" onClick={() => zoomOut({ duration: 180 })} aria-label="Zoom out" title="Zoom out" className="h-10 w-10 rounded-lg border border-white/10 text-xl font-semibold text-white hover:bg-white/10">−</button>
                  <button type="button" onClick={() => zoomIn({ duration: 180 })} aria-label="Zoom in" title="Zoom in" className="h-10 w-10 rounded-lg border border-white/10 text-xl font-semibold text-white hover:bg-white/10">+</button>
                  <button type="button" onClick={() => fitView({ padding: 0.12, duration: 350, maxZoom: 0.9 })} className="rounded-lg border border-white/10 px-3 py-2.5 text-xs font-semibold text-white hover:bg-white/10">Fit all</button>
                  <button type="button" onClick={() => setViewport({ x: 180, y: 55, zoom: 0.9 }, { duration: 250 })} className="rounded-lg border border-white/10 px-3 py-2.5 text-xs font-semibold text-white hover:bg-white/10">Start</button>
                </div>
                <ReactFlow
                  key={mode}
                  nodes={activeNodes}
                  edges={activeEdges}
                  nodeTypes={nodeTypes}
                  onNodesChange={mode === 'personal' ? onPersonalNodesChange : undefined}
                  onEdgesChange={mode === 'personal' ? onPersonalEdgesChange : undefined}
                  onConnect={mode === 'personal' ? onConnect : undefined}
                  onNodeClick={(_, node) => {
                    setSelectedId(node.id);
                    setIsEditing(false);
                  }}
                  onPaneClick={() => {
                    setSelectedId(null);
                    setIsEditing(false);
                  }}
                  nodesDraggable={mode === 'personal'}
                  nodesConnectable={mode === 'personal'}
                  elementsSelectable
                  fitView
                  fitViewOptions={{ padding: 0.18, maxZoom: 0.9 }}
                  minZoom={0.35}
                  maxZoom={1.15}
                  colorMode="dark"
                  zoomOnScroll={false}
                  zoomOnPinch={false}
                  zoomOnDoubleClick={false}
                  panOnScroll={false}
                  panOnDrag={true}
                  preventScrolling={false}
                  nodesFocusable={true}
                  proOptions={{ hideAttribution: true }}
                >
                  <Background color="#3f3f46" gap={28} size={1} />

                </ReactFlow>
              </div>
              <div className="border-t border-white/10 px-5 py-3 text-xs text-slate-500">
                Use the + and − buttons to zoom. Start returns to the first topics; Fit all shows the complete map. Drag empty space to move around.
              </div>
            </div>

            {selectedNode ? (
              <div className="rounded-2xl border border-white/10 bg-white/4.5 p-5 sm:p-7">
                {isEditing && mode === 'personal' && draft ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold">Edit topic</h3>
                      <p className="mt-1 text-xs text-slate-400">
                        Enter one concept or question per line.
                      </p>
                    </div>
                    <label className="block text-sm text-slate-300">
                      Title
                      <input
                        value={draft.title}
                        onChange={(event) => setDraft({ ...draft, title: event.target.value })}
                        className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-white outline-none focus:border-cyan-400/50"
                      />
                    </label>
                    <label className="block text-sm text-slate-300">
                      Category
                      <input
                        value={draft.category || ''}
                        onChange={(event) => setDraft({ ...draft, category: event.target.value })}
                        className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-white outline-none focus:border-cyan-400/50"
                      />
                    </label>
                    <label className="block text-sm text-slate-300">
                      Description
                      <textarea
                        rows={2}
                        value={draft.description || ''}
                        onChange={(event) => setDraft({ ...draft, description: event.target.value })}
                        className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-white outline-none focus:border-cyan-400/50"
                      />
                    </label>
                    <label className="block text-sm text-slate-300">
                      Concepts (one per line)
                      <textarea
                        rows={4}
                        value={draft.conceptsText}
                        onChange={(event) => setDraft({ ...draft, conceptsText: event.target.value })}
                        className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-white outline-none focus:border-cyan-400/50"
                      />
                    </label>
                    <label className="block text-sm text-slate-300">
                      Practice questions (one per line)
                      <textarea
                        rows={4}
                        value={draft.questionsText}
                        onChange={(event) => setDraft({ ...draft, questionsText: event.target.value })}
                        className="mt-2 w-full rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-white outline-none focus:border-cyan-400/50"
                      />
                    </label>
                    <div className="flex flex-wrap gap-3">
                      <button
                        type="button"
                        disabled={!draft.title.trim()}
                        onClick={saveTopic}
                        className="rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-cyan-300 disabled:opacity-40"
                      >
                        Save topic
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="rounded-xl border border-white/10 px-5 py-2.5 text-sm text-slate-300 hover:bg-white/5"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">
                          {selectedNode.data.category}
                        </p>
                        <h3 className="mt-2 text-2xl font-bold">{selectedNode.data.title}</h3>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                          {selectedNode.data.description}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={toggleCompleted}
                        className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                          selectedNode.data.completed
                            ? 'border border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
                            : 'bg-cyan-400 text-slate-950 hover:bg-cyan-300'
                        }`}
                      >
                        {selectedNode.data.completed ? 'Mark as incomplete' : 'Mark as completed'}
                      </button>
                    </div>

                    <div className="mt-7 grid gap-6 md:grid-cols-2">
                      <div>
                        <h4 className="mb-3 text-sm font-bold">Concepts to learn</h4>
                        {(selectedNode.data.concepts || []).length ? (
                          <ol className="list-inside list-decimal space-y-2 text-sm leading-6 text-slate-300">
                            {selectedNode.data.concepts.map((concept, index) => (
                              <li key={`${concept}-${index}`}>{concept}</li>
                            ))}
                          </ol>
                        ) : (
                          <p className="text-sm text-slate-500">No concepts added yet.</p>
                        )}
                      </div>
                      <div>
                        <h4 className="mb-3 text-sm font-bold">Important practice questions</h4>
                        {(selectedNode.data.questions || []).length ? (
                          <ol className="list-inside list-decimal space-y-2 text-sm leading-6 text-slate-300">
                            {selectedNode.data.questions.map((question, index) => (
                              <li key={`${question}-${index}`}>{question}</li>
                            ))}
                          </ol>
                        ) : (
                          <p className="text-sm text-slate-500">No questions added yet.</p>
                        )}
                      </div>
                    </div>

                    {mode === 'personal' && (
                      <div className="mt-7 flex flex-wrap gap-3 border-t border-white/10 pt-5">
                        <button
                          type="button"
                          onClick={startEditing}
                          className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-200 hover:bg-white/5"
                        >
                          Edit topic
                        </button>
                        <button
                          type="button"
                          onClick={deleteTopic}
                          className="rounded-xl border border-rose-400/20 px-4 py-2.5 text-sm text-rose-300 hover:bg-rose-400/10"
                        >
                          Delete topic
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/4.5 p-6 text-sm text-slate-400">
                Select a node in the graph to see its concepts and recommended questions.
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default function Roadmap() {
  return (
    <MainLayout showNavbar={true} showFooter={false}>
      <ReactFlowProvider>
        <RoadmapContent />
      </ReactFlowProvider>
    </MainLayout>
  );
}



