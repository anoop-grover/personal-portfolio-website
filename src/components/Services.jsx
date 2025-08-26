export default function Services() {
  return (
    <section className="min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center">
      <div className="max-w-4xl text-center">
        <h2 className="text-4xl font-bold mb-6">Services</h2>
        <p>I can help you with:</p>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          <div className="p-6 bg-white rounded-lg shadow">💻 Web Development</div>
          <div className="p-6 bg-white rounded-lg shadow">⚡ DSA Problem Solving</div>
          <div className="p-6 bg-white rounded-lg shadow">🗄️ SQL Database Design</div>
        </div>
      </div>
    </section>
  )
}
