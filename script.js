
function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}
function showMechanic(stage) {
  const details = {
    creation: "Contest is auto-created at 00:00 IST.",
    open: "Market open prices fetched at 09:15 IST.",
    close: "Market close prices fetched at 15:30 IST.",
    result: "Leaderboard is calculated and published at 16:00 IST."
  };
  document.getElementById('mechanic-detail').innerText = details[stage];
}
