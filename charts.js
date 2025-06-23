
document.addEventListener('DOMContentLoaded', function () {
  const ctx = document.getElementById('apiChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Alpha Vantage', 'Polygon', 'Finnhub'],
      datasets: [{
        label: 'Data Coverage Score',
        data: [65, 90, 85],
        backgroundColor: ['#0ea5e9', '#22c55e', '#facc15']
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true, max: 100 }
      }
    }
  });
});
