const ImpactStatement = () => {
  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-br from-accent/95 via-accent to-accent-secondary/90">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.08]">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(0deg, white 0px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, white 0px, transparent 1px, transparent 40px)`,
        }} />
      </div>

      <div className="container-wide relative">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          {/* Main Statement */}
          <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-white">
            We don't build websites.
            <br />
            We build{" "}
            <span className="relative inline-block">
              <span className="text-white">revenue engines</span>
              <div className="absolute -inset-2 bg-white/20 blur-2xl -z-10" />
            </span>
            .
          </h2>

          {/* Supporting Text */}
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Every pixel, every line of code, every design decision is engineered to convert visitors into customers. 
            Because pretty websites don't pay the bills; <span className="text-white font-semibold">results do</span>.
          </p>

          {/* Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
            {[
              {
                metric: "$2.5M+",
                label: "Revenue Generated",
                desc: "For our clients in 2025"
              },
              {
                metric: "156%",
                label: "Avg. Traffic Increase",
                desc: "Within first 6 months"
              },
              {
                metric: "4.2x",
                label: "ROI Average",
                desc: "Return on investment"
              }
            ].map((item, index) => (
              <div 
                key={item.metric}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 group hover:bg-white/15 hover:border-white/30 transition-all duration-500 hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {item.metric}
                </div>
                <div className="text-lg font-semibold text-white mb-1">
                  {item.label}
                </div>
                <div className="text-sm text-white/80">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStatement;
