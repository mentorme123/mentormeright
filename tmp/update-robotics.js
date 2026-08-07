const fs = require('fs');
const path = 'src/app/(main)/services/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// Add roboticsCurriculum constant after line 19 (after scrollToSection function)
const newCode = `  const roboticsCurriculum = [
    {
      title: "Introduction to Robotics & Its Applications",
      details: [
        "Understanding what robots are and their significance in everyday life",
        "Exploring different types of robots and their real-world applications",
        "Basics of how robots sense, think, and act",
        "Introduction to key components: motors, sensors, controllers, and power sources"
      ]
    },
    {
      title: "Fundamentals of Electronics & Circuitry",
      details: [
        "Learning about LEDs, sensors, motors, and buzzers used in robotics",
        "Basics of circuit connections, power supply, and simple electronic circuits",
        "Understanding how circuits control robotic movement and responses",
        "Hands-on experience in assembling simple electronic projects"
      ]
    },
    {
      title: "Practical Circuit Implementation",
      details: [
        "Connecting input and output devices to build functional circuits",
        "Understanding how sensors and motors work together in robotics",
        "Implementing basic automation concepts using circuits and sensors"
      ]
    },
    {
      title: "Sensor Integration & Interactive Systems",
      details: [
        "Understanding different types of sensors (IR, ultrasonic, LDR, etc.)",
        "Learning how sensors help robots detect and respond to their environment",
        "Using sensors to measure distance, detect light, and sense obstacles"
      ]
    },
    {
      title: "Robotics Programming & Control Systems",
      details: [
        "Introduction to basic block-based programming and its role in robotics",
        "Learning how to control robots using simple coding",
        "Programming sensors and motors to create interactive robotic behavior",
        "Introduction to microcontroller-based projects (Arduino, Microcontrollers, etc.)"
      ]
    },
    {
      title: "Automation & Smart Robotics",
      details: [
        "Basics of robotic automation and real-world problem-solving",
        "Learning how robots make decisions based on sensor inputs",
        "Understanding how robots are used in schools, homes, and industries"
      ]
    },
    {
      title: "Robotics Projects & Expo",
      details: [
        "Applying STEM concepts to build exciting robotics projects",
        "Encouraging team collaboration and problem-solving skills",
        "Students develop and present their own robotic creations",
        "Final Expo: Showcasing innovative robotics projects"
      ]
    }
  ];\n\n`;

// Insert after the scrollToSection function closing brace
content = content.replace('  };\n\n  const guidancePrograms', '  };\n\n' + newCode + '  const guidancePrograms');

// Replace the expanded robotics section with detailed content
const oldExpandedSection = `                      {roboticsExpanded && (
                         <div className="ml-6 space-y-1 border-l-2 border-slate-200 pl-4 mt-2">
                           <div className="flex items-start gap-2">
                             <span className="text-slate-300">►</span>
                             <span className="text-sm font-medium text-slate-400">Introduction to Robotics & Its Applications</span>
                           </div>
                           <div className="flex items-start gap-2">
                             <span className="text-slate-300">►</span>
                             <span className="text-sm font-medium text-slate-400">Fundamentals of Electronics & Circuitry</span>
                           </div>
                           <div className="flex items-start gap-2">
                             <span className="text-slate-300">►</span>
                             <span className="text-sm font-medium text-slate-400">Practical Circuit Implementation</span>
                           </div>
                           <div className="flex items-start gap-2">
                             <span className="text-slate-300">►</span>
                             <span className="text-sm font-medium text-slate-400">Sensor Integration & Interactive Systems</span>
                           </div>
                           <div className="flex items-start gap-2">
                             <span className="text-slate-300">►</span>
                             <span className="text-sm font-medium text-slate-400">Robotics Programming & Control Systems</span>
                           </div>
                           <div className="flex items-start gap-2">
                             <span className="text-slate-300">►</span>
                             <span className="text-sm font-medium text-slate-400">Automation & Smart Robotics</span>
                           </div>
                           <div className="flex items-start gap-2">
                             <span className="text-slate-300">►</span>
                             <span className="text-sm font-medium text-slate-400">Robotics Projects & Expo</span>
                           </div>
                         </div>
                       )}`;

const newExpandedSection = `                      {roboticsCurriculum.map((module, idx) => (
                        <div key={idx} className="ml-8 mt-2 space-y-1">
                          <div className="flex items-start gap-2">
                            <span className="text-slate-300">►</span>
                            <span className="text-sm font-medium text-slate-400">{idx === roboticsCurriculum.length - 1 ? "🏆" : "📘"} {module.title}</span>
                          </div>
                          {module.details.map((detail, i) => (
                            <div key={i} className="flex items-start gap-2 ml-4">
                              <span className="text-slate-300">•</span>
                              <span className="text-xs text-slate-500">→ {detail}</span>
                            </div>
                          ))}
                        </div>
                      ))}`;

content = content.replace(oldExpandedSection, newExpandedSection);

fs.writeFileSync(path, content);
console.log('Done');
