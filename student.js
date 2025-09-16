document.addEventListener('DOMContentLoaded', () => {
  // Check if user is logged in, if not redirect to login
  if (!sessionStorage.getItem('loggedIn')) {
    window.location.href = 'index.html';
    return;
  }
  
  // Set welcome name
  const name = sessionStorage.getItem('nava_user_name');
  if (name) {
    const el = document.getElementById('welcomeName');
    if (el) el.textContent = 'Welcome, ' + name;
  }
  
  // Handle sidebar navigation
  document.querySelectorAll(".sidebar button").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".sidebar button").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".section").forEach(sec => sec.classList.remove("active"));
      
      btn.classList.add("active");
      const sectionId = btn.getAttribute("data-section");
      const target = document.getElementById(sectionId);
      if (target) target.classList.add("active");
    });
  });
  
  // Set up navigation control - back button should exit site
  setupMainInterfaceNavigation();
  
  // Initialize connectivity status
  updateConnectivityStatus();
});

function setupMainInterfaceNavigation() {
  // Clear browser history and create a single entry point
  history.replaceState(null, null, window.location.href);
  
  // Handle back button - should exit site completely
  window.addEventListener('popstate', function(event) {
    // Prevent going back to login or any other page
    // Try to close the browser tab/window
    window.close();
    
    // Fallback for browsers that don't allow window.close()
    setTimeout(() => {
      window.location.href = 'about:blank';
    }, 100);
  });
  
  // Also handle the pageshow event
  window.addEventListener('pageshow', function(event) {
    if (sessionStorage.getItem('loggedIn')) {
      // User is logged in on main interface
      history.replaceState(null, null, window.location.href);
    }
  });
}

function logout() {
  if (confirm('Are you sure you want to logout?')) {
    // Clear all session data
    sessionStorage.clear();
    
    // Go to login page
    window.location.href = 'index.html';
  }
}

// Connectivity status update function
function updateConnectivityStatus() {
  const status = document.getElementById('connectivityStatus');
  if (status) {
    if (navigator.onLine) {
      status.innerHTML = '🟢 Online';
      status.style.background = '#d4edda';
      status.style.color = '#155724';
    } else {
      status.innerHTML = '🔴 Offline';
      status.style.background = '#f8d7da';
      status.style.color = '#721c24';
    }
  }
}

// Listen for connectivity changes
window.addEventListener('online', updateConnectivityStatus);
window.addEventListener('offline', updateConnectivityStatus);

// Prevent right-click context menu (optional security feature)
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});

// Prevent certain keyboard shortcuts (optional security feature)
document.addEventListener('keydown', function(e) {
  // Prevent F12, Ctrl+Shift+I, Ctrl+U, etc.
  if (e.key === 'F12' ||
    (e.ctrlKey && e.shiftKey && e.key === 'I') ||
    (e.ctrlKey && e.key === 'u')) {
    e.preventDefault();
  }
});