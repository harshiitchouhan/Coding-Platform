import {
  PlayCircle,
  Lightbulb,
  Route,
  ListChecks,
  Clock,
  Database,
  Video,
} from "lucide-react";




export default function Editorial({
  secureURL,
  thumbnailURL,
  duration,
  editorial,
}) {
  const formatDuration = (seconds) => {
    if (!seconds) return "N/A";

    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);

    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

    const formatText = (text) => {
    if (!text) return [];

    return text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
    };

    const Section = ({ icon: Icon, title, children }) => {
    const lines = formatText(children);

    const groups = [];
    let currentGroup = null;

    lines.forEach((line) => {
        const cleanLine = line.trim();

        if (cleanLine.endsWith(":")) {
        currentGroup = {
            heading: cleanLine.slice(0, -1),
            items: [],
        };
        groups.push(currentGroup);
        } else if (currentGroup) {
        currentGroup.items.push(cleanLine);
        } else {
        groups.push({
            heading: null,
            items: [cleanLine],
        });
        }
    });

    return (
        <div className="group rounded-2xl border border-slate-700/70 bg-[#0F172A] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition hover:border-slate-500/70">
        {/* Title */}
        <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-cyan-300 ring-1 ring-slate-700">
            <Icon size={18} />
            </div>

            <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <div className="mt-1 h-0.5 w-12 rounded-full bg-cyan-400/70" />
            </div>
        </div>

        {/* Empty */}
        {lines.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/40 px-4 py-5 text-sm text-slate-500">
            No content added yet.
            </div>
        ) : (
            <div className="space-y-6">
            {groups.map((group, groupIndex) => (
                <div key={groupIndex} className="relative pl-5">
                {/* vertical timeline line */}
                <div className="absolute left-1 top-2 bottom-0 w-px bg-slate-700/70" />

                {/* subheading */}
                {group.heading && (
                    <div className="mb-3 flex items-center gap-3">
                    <span className="relative z-10 h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.55)]" />
                    <h4 className="text-sm font-semibold tracking-wide text-slate-100">
                        {group.heading}
                    </h4>
                    </div>
                )}

                {/* items */}
                <div className={`space-y-3 ${group.heading ? "ml-5" : ""}`}>
                    {group.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex gap-3">
                        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />

                        <p className="text-sm leading-7 text-slate-300">
                        {item}
                        </p>
                    </div>
                    ))}
                </div>
                </div>
            ))}
            </div>
        )}
        </div>
    );
    };

  return (
    <div className="space-y-6 text-gray-300">

      {/* Header */}
      <div className="rounded-2xl border border-white/10 bg-linear-to-br from-purple-500/10 via-[#111827] to-blue-500/10 p-5">
        <h2 className="text-2xl font-bold text-white mb-2">
          Editorial
        </h2>
        <p className="text-sm text-gray-400">
          Understand the intuition, approach, algorithm and complexity of this problem.
        </p>
      </div>

      {/* Video Section */}
      <div className="rounded-2xl border border-white/10 bg-[#111827] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Video size={20} className="text-purple-400" />
            <h3 className="text-lg font-semibold text-white">
              Video Explanation
            </h3>
          </div>

          <span className="text-xs px-3 py-1 rounded-full bg-white/10 text-gray-300">
            {formatDuration(duration)}
          </span>
        </div>

        {secureURL ? (
          <video
            controls
            poster={thumbnailURL}
            preload="metadata"
            className="w-full max-h-105 bg-black"
          >
            <source src={secureURL} type="video/mp4" />
            Your browser does not support video.
          </video>
        ) : (
          <div className="h-56 flex flex-col items-center justify-center text-gray-500">
            <PlayCircle size={42} className="mb-3" />
            <p>No video explanation uploaded yet.</p>
          </div>
        )}
      </div>

      {/* Editorial Text Sections */}
      <div className="grid grid-cols-1 gap-5">
        <Section icon={Lightbulb} title="Intuition">
          {editorial?.intuition}
        </Section>

        <Section icon={Route} title="Approach">
          {editorial?.approach}
        </Section>

        <Section icon={ListChecks} title="Algorithm">
          {editorial?.algorithm}
        </Section>
      </div>

      {/* Complexity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Section icon={Clock} title="Time Complexity">
          {editorial?.timeComplexity}
        </Section>

        <Section icon={Database} title="Space Complexity">
          {editorial?.spaceComplexity}
        </Section>
      </div>
    </div>
  );
}