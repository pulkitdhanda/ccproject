const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
let currentUser = "Alex Morgan";
let enrolled = new Set(["ui"]);
let activeFilter = "All";
const courses = [
 {id:"ui",title:"UI/UX Design Essentials",category:"Design",level:"Beginner",duration:"6h 20m",lessons:18,icon:"✏️",color:"purple",desc:"Learn the foundations of user-centred design and create interfaces people love.",progress:68,teacher:"Maya Chen"},
 {id:"js",title:"JavaScript: From Zero to Hero",category:"Development",level:"Beginner",duration:"9h 10m",lessons:24,icon:"💻",color:"orange",desc:"Build interactive websites with modern JavaScript fundamentals.",progress:0,teacher:"Daniel Brooks"},
 {id:"data",title:"Data Analytics with Python",category:"Data Science",level:"Intermediate",duration:"8h 45m",lessons:21,icon:"📊",color:"green",desc:"Turn raw data into clear insights using Python and practical projects.",progress:0,teacher:"Aarav Mehta"},
 {id:"graphic",title:"Graphic Design Masterclass",category:"Design",level:"Intermediate",duration:"5h 30m",lessons:16,icon:"🎨",color:"orange",desc:"Explore colour, typography and visual storytelling for digital media.",progress:0,teacher:"Sofia Rivera"},
 {id:"marketing",title:"Digital Marketing Basics",category:"Business",level:"Beginner",duration:"4h 15m",lessons:14,icon:"📣",color:"purple",desc:"Understand SEO, social media, content strategy and campaign basics.",progress:0,teacher:"Noah Williams"},
 {id:"python",title:"Python Programming",category:"Development",level:"Beginner",duration:"10h 05m",lessons:28,icon:"🐍",color:"green",desc:"Start coding with Python through examples, exercises and mini projects.",progress:0,teacher:"Priya Sharma"}
];
const activities = [
 ["✓","Completed a lesson","UI/UX Design · 2 hours ago"],
 ["★","Earned a new badge","Quick Learner · Yesterday"],
 ["▶","Started a course","UI/UX Design · 3 days ago"]
];
function toast(msg){const el=$("#toast");el.textContent=msg;el.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>el.classList.remove("show"),2600)}
function initials(name){return name.trim().split(/\s+/).slice(0,2).map(x=>x[0]).join("").toUpperCase()||"S"}
$("#togglePassword").addEventListener("click",()=>{const p=$("#password");p.type=p.type==="password"?"text":"password";$("#togglePassword").textContent=p.type==="password"?"◉":"◎"});
$("#loginForm").addEventListener("submit",e=>{e.preventDefault();currentUser=$("#username").value.trim()||"Learner";$("#loginScreen").classList.add("hidden");$("#app").classList.remove("hidden");$("#topName").textContent=currentUser;$("#topAvatar").textContent=initials(currentUser);render("dashboard");toast(`Welcome to Learnify, ${currentUser.split(" ")[0]}!`)});
$("#logoutBtn").addEventListener("click",()=>{$("#app").classList.add("hidden");$("#loginScreen").classList.remove("hidden");$("#password").value="";toast("You have been logged out.")});
$("#mobileMenu").addEventListener("click",()=>$("#sidebar").classList.toggle("open"));
$("#streakBtn").addEventListener("click",()=>{render("my-learning");toast("Your learning plan is ready.")});
$("#notificationBtn").addEventListener("click",()=>toast("You're all caught up. Great work!"));
function navigate(page){render(page);$("#sidebar").classList.remove("open");$$(".nav-link").forEach(b=>b.classList.toggle("active",b.dataset.page===page))}
$$("[data-page]").forEach(b=>b.addEventListener("click",()=>navigate(b.dataset.page)));
function courseCard(c){const isIn=enrolled.has(c.id);return `<article class="course-card"><div class="course-banner thumb-${c.color}"><span>${c.category}</span>${c.icon}</div><div class="course-card-body"><div class="course-meta"><span>${c.level}</span><span>◷ ${c.duration}</span></div><h3>${c.title}</h3><p>${c.desc}</p><div class="course-bottom"><b>${c.lessons} lessons</b><button class="enroll-btn ${isIn?"enrolled":""}" data-enroll="${c.id}">${isIn?"✓ Enrolled":"Enroll now"}</button></div></div></article>`}
function bindEnroll(){ $$("[data-enroll]").forEach(b=>b.addEventListener("click",()=>{const id=b.dataset.enroll;if(enrolled.has(id)){toast("This course is already in your learning list.");}else{enrolled.add(id);toast("Course added to My Learning!");}render("courses")}))}
function render(page){
 const crumb=({dashboard:"Dashboard",courses:"Explore courses","my-learning":"My learning",profile:"My profile"})[page]||"Dashboard";$("#pageCrumb").textContent=crumb;
 const content=$("#pageContent");
 if(page==="dashboard"){
  const inProgress=courses.filter(c=>enrolled.has(c.id));
  content.innerHTML=`<div class="welcome-row"><div><h1>Good day, ${currentUser.split(" ")[0]} 👋</h1><p>Ready to make today count? Pick up where you left off.</p></div><div class="date-chip">▦ &nbsp; Friday, November 6, 2026</div></div>
  <div class="stats-grid">
   <div class="stat-card"><div class="stat-top">Courses enrolled <span class="stat-icon">▤</span></div><strong>${enrolled.size.toString().padStart(2,"0")}</strong><small><em>+1</em> keep exploring</small></div>
   <div class="stat-card"><div class="stat-top">Learning hours <span class="stat-icon">◷</span></div><strong>12.5</strong><small><em>+2.5h</em> this week</small></div>
   <div class="stat-card"><div class="stat-top">Lessons completed <span class="stat-icon">✓</span></div><strong>28</strong><small><em>+6</em> this week</small></div>
   <div class="stat-card"><div class="stat-top">Day streak <span class="stat-icon">♨</span></div><strong>5 days</strong><small>You're building a habit!</small></div>
  </div>
  <div class="dashboard-grid"><section class="panel"><div class="panel-head"><h3>Continue learning</h3><button class="text-btn" data-page="my-learning">View all →</button></div>
  ${inProgress.length?inProgress.slice(0,2).map(c=>`<div class="continue-card"><div class="course-thumb thumb-${c.color}">${c.icon}</div><div class="course-info"><small>${c.category} · ${c.teacher}</small><b>${c.title}</b><p>${c.progress||0}% completed</p><div class="progress-track"><span style="width:${c.progress||0}%"></span></div></div><button class="resume-btn" data-resume="${c.id}">Resume</button></div>`).join(""):`<div class="empty-state">No courses yet. Explore and enroll in your first course.</div>`}
  <div class="goal-card"><div><h3>Your weekly learning goal</h3><p>You're doing great. Keep showing up for yourself.</p></div><div class="goal-circle">3/5</div></div></section>
  <section class="panel"><div class="panel-head"><h3>Recent activity</h3><span class="text-btn">This week</span></div><div class="activity-list">${activities.map(a=>`<div class="activity"><div class="activity-icon">${a[0]}</div><div><b>${a[1]}</b><small>${a[2]}</small></div></div>`).join("")}</div><div class="panel-head" style="margin-top:27px"><h3>Recommended for you</h3><button class="text-btn" data-page="courses">Browse →</button></div><div class="activity"><div class="activity-icon">🐍</div><div><b>Python Programming</b><small>Beginner · 10h 05m</small></div></div></section></div>`;
  $$("[data-page]").filter(x=>x.closest("#pageContent")).forEach(b=>b.addEventListener("click",()=>navigate(b.dataset.page)));
  $$("[data-resume]").forEach(b=>b.addEventListener("click",()=>toast("Lesson opened — happy learning!")));
 } else if(page==="courses"){
  content.innerHTML=`<h1 class="section-title">Explore courses</h1><p class="section-sub">Discover something new. Your next opportunity starts with a lesson.</p><div class="filter-row">${["All","Development","Design","Data Science","Business"].map(f=>`<button class="filter-btn ${activeFilter===f?"active":""}" data-filter="${f}">${f}</button>`).join("")}<div class="search-box"><input id="courseSearch" placeholder="⌕  Search courses..."></div></div><div id="coursesGrid" class="courses-grid"></div>`;
  const draw=()=>{const q=($("#courseSearch")?.value||"").toLowerCase();const list=courses.filter(c=>(activeFilter==="All"||c.category===activeFilter)&&(`${c.title} ${c.desc} ${c.category}`).toLowerCase().includes(q));$("#coursesGrid").innerHTML=list.length?list.map(courseCard).join(""):`<div class="empty-state"><strong>No courses found</strong>Try another search or category.</div>`;bindEnroll()};
  $$("[data-filter]").forEach(b=>b.addEventListener("click",()=>{activeFilter=b.dataset.filter;$$("[data-filter]").forEach(x=>x.classList.toggle("active",x===b));draw()}));$("#courseSearch").addEventListener("input",draw);draw();
 } else if(page==="my-learning"){
  const list=courses.filter(c=>enrolled.has(c.id));
  content.innerHTML=`<h1 class="section-title">My learning</h1><p class="section-sub">All your enrolled courses, in one place. Keep moving forward.</p><div class="learning-layout"><section class="panel"><div class="panel-head"><h3>My courses <span style="color:#a1aaba;font-weight:400">(${list.length})</span></h3><span class="text-btn">In progress</span></div>${list.length?list.map(c=>`<div class="learning-item"><div class="course-thumb thumb-${c.color}">${c.icon}</div><div class="course-info"><small>${c.category} · ${c.teacher}</small><b>${c.title}</b><p>${c.progress||0}% complete · ${c.lessons} lessons</p><div class="progress-track"><span style="width:${c.progress||0}%"></span></div></div><button class="resume-btn" data-resume="${c.id}">Continue</button></div>`).join(""):`<div class="empty-state"><strong>Your learning list is empty</strong>Visit Explore courses to find your next skill.<br><br><button class="primary-btn" data-goto-courses>Explore courses</button></div>`}</section><section class="panel"><div class="panel-head"><h3>Learning overview</h3></div><div class="stat-card" style="border:0;padding:8px 0"><div class="stat-top">Total enrolled</div><strong>${list.length}</strong><small>Courses in your library</small></div><div class="stat-card" style="border:0;padding:8px 0"><div class="stat-top">Learning time</div><strong>12.5h</strong><small>Time invested so far</small></div><div class="goal-card"><div><h3>Stay consistent</h3><p>Set aside 20 minutes today.</p></div><div class="goal-circle">✦</div></div></section></div>`;
  $$("[data-resume]").forEach(b=>b.addEventListener("click",()=>toast("Lesson opened — happy learning!")));const go=$("[data-goto-courses]");if(go)go.addEventListener("click",()=>navigate("courses"));
 } else if(page==="profile"){
  content.innerHTML=`<h1 class="section-title">My profile</h1><p class="section-sub">Manage your learning identity and personal details.</p><div class="profile-layout"><section class="panel profile-card"><div class="profile-avatar">${initials(currentUser)}</div><h3>${currentUser}</h3><p>Student · Learnify member</p><span class="level-pill">✦ &nbsp; Curious learner</span><div class="profile-details" style="margin-top:25px;text-align:left"><div class="detail-box"><small>Courses joined</small><b>${enrolled.size}</b></div><div class="detail-box"><small>Learning streak</small><b>5 days</b></div><div class="detail-box"><small>Lessons completed</small><b>28</b></div><div class="detail-box"><small>Hours learned</small><b>12.5 hrs</b></div></div></section><section class="panel"><div class="panel-head"><h3>Personal information</h3></div><form id="profileForm" class="settings-form"><label>Full name<input id="profileName" value="${currentUser.replace(/"/g,"&quot;")}" required></label><label>Email address<input id="profileEmail" type="email" placeholder="student@example.com"></label><label>Learning interest<input id="profileInterest" placeholder="e.g. Web development"></label><label>Learning goal<input id="profileGoal" placeholder="e.g. 5 hours per week"></label><button class="primary-btn" type="submit">Save changes →</button></form></section></div>`;
  $("#profileForm").addEventListener("submit",e=>{e.preventDefault();currentUser=$("#profileName").value.trim()||currentUser;$("#topName").textContent=currentUser;$("#topAvatar").textContent=initials(currentUser);render("profile");toast("Profile updated successfully.")});
 }
}
