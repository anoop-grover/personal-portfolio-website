export default function Contact() {
  return (
    <section className="min-h-screen bg-white text-gray-900 flex items-center justify-center">
      <div className="max-w-xl text-center">
        <h2 className="text-4xl font-bold mb-6">Contact Me</h2>
        <p className="mb-4">Let’s work together! Reach out via email:</p>
        <a 
          href="mailto:anoopgrover@gmail.com" 
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
        >
          📧 anoopgrover@gmail.com
        </a>
      </div>
    </section>
  )
}
