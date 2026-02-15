(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function t(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(s){if(s.ep)return;s.ep=!0;const n=t(s);fetch(s.href,n)}})();class E{constructor(){this.routes={},this.currentRoute=null,window.addEventListener("hashchange",()=>this.handleRoute()),window.addEventListener("load",()=>this.handleRoute())}addRoute(e,t){this.routes[e]=t}handleRoute(){const e=window.location.hash.slice(1)||"/",[t,r]=e.split("?");if(this.queryParams=new URLSearchParams(r||""),this.routes[t]){this.currentRoute=t,this.routes[t]();return}for(const[s,n]of Object.entries(this.routes)){const i=this.matchRoute(s,t);if(i){this.currentRoute=t,n(i);return}}this.routes["/"]&&(this.currentRoute="/",this.routes["/"]())}getQueryParam(e){return this.queryParams?this.queryParams.get(e):null}matchRoute(e,t){const r=e.split("/"),s=t.split("/");if(r.length!==s.length)return null;const n={};for(let i=0;i<r.length;i++)if(r[i].startsWith(":")){const c=r[i].slice(1);n[c]=s[i]}else if(r[i]!==s[i])return null;return n}navigate(e){window.location.hash=e}getCurrentRoute(){return window.location.hash.slice(1)||"/"}}const d=new E;class S{constructor(){this.locale=localStorage.getItem("locale")||"en",this.translations={},this.listeners=[]}async init(){const e="/portfolio-timothee-pirot/",[t,r]=await Promise.all([fetch(`${e}data/fr/ui.json`).then(s=>s.json()),fetch(`${e}data/en/ui.json`).then(s=>s.json())]);this.translations={fr:t,en:r},document.documentElement.lang=this.locale}getLocale(){return this.locale}t(e){const t=e.split(".");let r=this.translations[this.locale];for(const s of t){if(r===void 0)return e;r=r[s]}return r||e}td(e){return typeof e=="string"?e:e&&typeof e=="object"&&(e.fr||e.en)?e[this.locale]||e.fr||"":e||""}getDataPath(e){return`/portfolio-timothee-pirot/data/${this.locale}/${e}`}setLocale(e){this.locale=e,localStorage.setItem("locale",e),document.documentElement.lang=e,this.listeners.forEach(t=>t(e))}toggleLocale(){this.setLocale(this.locale==="fr"?"en":"fr")}onLocaleChange(e){this.listeners.push(e)}}const o=new S,P="TP",B=[{id:"home",label:{fr:"Accueil",en:"Home"},path:"/"},{id:"projects",label:{fr:"Projets",en:"Projects"},path:"/projects"},{id:"about",label:{fr:"CV",en:"CV"},path:"/moi"},{id:"contact",label:{fr:"Contact",en:"Contact"},path:"/contact"}],D={siteTitle:P,mainNav:B};class I{constructor(){this.isMenuOpen=!1,this.isScrolled=!1,this.navigationData=D,this.headerElement=null}async init(){this.render(),this.attachEvents(),window.addEventListener("hashchange",()=>this.updateActiveLinks())}_renderInnerHTML(){return`
      <nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <!-- Logo -->
        <a href="#/" class="font-mono text-sm font-semibold tracking-wider text-primary">
          ${this.navigationData.siteTitle}.
        </a>

        <!-- Desktop Navigation -->
        <div class="hidden items-center gap-8 md:flex">
          <ul class="flex items-center gap-8" id="desktop-nav">
            ${this.renderNavLinks()}
          </ul>
          <button
            id="lang-toggle-desktop"
            class="rounded-md border border-border px-2.5 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            aria-label="Switch language"
          >
            ${o.getLocale()==="fr"?"EN":"FR"}
          </button>
        </div>

        <!-- Mobile: lang toggle + hamburger -->
        <div class="flex items-center gap-3 md:hidden">
          <button
            id="lang-toggle-mobile"
            class="rounded-md border border-border px-2.5 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            aria-label="Switch language"
          >
            ${o.getLocale()==="fr"?"EN":"FR"}
          </button>
          <button
            id="mobile-menu-toggle"
            class="flex flex-col gap-1.5"
            aria-label="Toggle menu"
          >
            <span class="hamburger-line h-0.5 w-6 bg-foreground transition-transform duration-300"></span>
            <span class="hamburger-line h-0.5 w-6 bg-foreground transition-opacity duration-300"></span>
            <span class="hamburger-line h-0.5 w-6 bg-foreground transition-transform duration-300"></span>
          </button>
        </div>
      </nav>

      <!-- Mobile Menu -->
      <div id="mobile-menu" class="hidden border-t border-border/50 bg-background/95 backdrop-blur-md md:hidden">
        <ul class="flex flex-col gap-1 px-6 py-4">
          ${this.renderNavLinks(!0)}
        </ul>
      </div>
    `}render(){const e=document.createElement("header");e.className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md",e.id="main-header",e.innerHTML=this._renderInnerHTML(),document.body.insertBefore(e,document.body.firstChild),this.headerElement=e}reRender(){const e=document.getElementById("main-header");e&&(e.innerHTML=this._renderInnerHTML(),this.isMenuOpen=!1,this.attachEvents(),this.updateActiveLinks())}renderNavLinks(e=!1){return this.navigationData.mainNav.map(t=>{const r=d.getCurrentRoute()===t.path,s=o.td(t.label);if(e){const n=r?"text-primary":"text-muted-foreground";return`
          <li>
            <a
              href="#${t.path}"
              class="block rounded-md px-3 py-2 text-sm transition-colors hover:bg-secondary ${n} nav-link"
              data-path="${t.path}"
            >
              ${s}
            </a>
          </li>
        `}else{const n=r?"text-primary":"text-muted-foreground";return`
          <li>
            <a
              href="#${t.path}"
              class="text-sm transition-colors hover:text-primary ${n} nav-link"
              data-path="${t.path}"
            >
              ${s}
            </a>
          </li>
        `}}).join("")}attachEvents(){const e=document.getElementById("mobile-menu-toggle"),t=document.getElementById("mobile-menu"),r=e.querySelectorAll(".hamburger-line");e.addEventListener("click",()=>{this.isMenuOpen=!this.isMenuOpen,this.isMenuOpen?(t.classList.remove("hidden"),r[0].style.transform="translateY(8px) rotate(45deg)",r[1].style.opacity="0",r[2].style.transform="translateY(-8px) rotate(-45deg)"):(t.classList.add("hidden"),r[0].style.transform="",r[1].style.opacity="1",r[2].style.transform="")}),document.addEventListener("click",c=>{c.target.classList.contains("nav-link")&&this.isMenuOpen&&(this.isMenuOpen=!1,t.classList.add("hidden"),r[0].style.transform="",r[1].style.opacity="1",r[2].style.transform="")});const s=document.getElementById("lang-toggle-desktop"),n=document.getElementById("lang-toggle-mobile"),i=()=>o.toggleLocale();s&&s.addEventListener("click",i),n&&n.addEventListener("click",i)}updateActiveLinks(){const e=d.getCurrentRoute();document.querySelectorAll(".nav-link").forEach(r=>{const s=r.getAttribute("data-path");e===s?(r.classList.add("text-primary"),r.classList.remove("text-muted-foreground")):(r.classList.remove("text-primary"),r.classList.add("text-muted-foreground"))})}}const j=new I,T={startDate:{fr:"Dès septembre",en:"In Septembe"}},H={fr:"En recherche d'une alternance de 24 mois en robotique, systèmes embarqués ou en développement",en:"Seeking a 24-month apprenticeship in robotics, embedded systems or development"},A={fr:"Bonjour ! J'ai 24 ans, je suis franco-allemand et étudiant en Bac+3 (pré-MSc) chez EPITECH Paris. Passionné par l'intersection entre le matériel et le logiciel, je m'intéresse particulièrement à la robotique et aux systèmes embarqués, tout en développant mes compétences en développement logiciel. J'aime aussi concrétiser mes idées par la modélisation et l'impression 3D.",en:"Hello! I'm 24 years old, Franco-German, and currently a third-year student (Bac+3) at EPITECH Paris. Passionate about the intersection of hardware and software, I'm particularly interested in robotics and embedded systems, while developing my skills in software development. I also enjoy bringing my ideas to life through 3D modeling and printing."},z={fr:"Mobile en France et en Allemagne",en:"Mobile across France and Germany."},y={availability:T,headline:H,presentation:A,mobility:z};class R{constructor(){this.profile=y}render(){return`
      <section class="relative flex min-h-[85vh] flex-col items-center justify-center px-6 pt-20 text-center">
        <!-- Subtle grid background -->
        <div
          class="pointer-events-none absolute inset-0 opacity-[0.03]"
          style="
            background-image: linear-gradient(hsl(174 60% 51%) 1px, transparent 1px), linear-gradient(90deg, hsl(174 60% 51%) 1px, transparent 1px);
            background-size: 60px 60px;
          "
        ></div>

        <div class="relative z-10 mx-auto max-w-3xl">
          <p class="mb-4 font-mono text-sm tracking-wider text-primary">
            ${o.t("hero.commentTag")}
          </p>
          <h1 class="text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">
            Timothée Pirot
          </h1>
          <p class="mt-3 text-lg font-medium text-muted-foreground md:text-xl">
            ${o.td(this.profile.presentation)}
          </p>
          <div class="mt-4 rounded-lg bg-muted/50 border-l-4 border-primary p-4">
            <p class="text-pretty leading-relaxed text-foreground md:text-xl font-medium">
              ${o.td(this.profile.headline)} <br>
              ${o.td(this.profile.mobility)} <br>
              ${o.t("hero.availability")} : ${o.td(this.profile.availability.startDate)}
            </p>
          </div>

          <div class="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">

              <a href="#/projects"
              class="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              ${o.t("hero.discoverProjects")}
            </a>
            <button
              id="scroll-to-skills"
              class="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              ${o.t("hero.seeSkills")}
            </button>
          </div>
        </div>

        <button
          id="scroll-to-featured"
          class="absolute bottom-8 animate-bounce text-muted-foreground transition-colors hover:text-primary"
          aria-label="${o.t("hero.scrollAriaLabel")}"
        >
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </section>
    `}attachEvents(){const e=document.getElementById("scroll-to-featured");e&&e.addEventListener("click",r=>{r.preventDefault();const s=document.getElementById("featured-projects");s&&s.scrollIntoView({behavior:"smooth"})});const t=document.getElementById("scroll-to-skills");t&&t.addEventListener("click",r=>{r.preventDefault();const s=document.getElementById("competences");s&&s.scrollIntoView({behavior:"smooth"})})}}const $=new R;class F{constructor(){this.contextIcons={school:'<svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>',personal:'<svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>',association:'<svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>',work:'<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>'}}get contextLabels(){return{school:o.t("projectCard.contextSchool"),personal:o.t("projectCard.contextPersonal"),association:o.t("projectCard.contextAssociation"),work:o.t("projectCard.contextWork")}}render(e,t=!1){const r=e.status==="in_progress"?"bg-primary/80 text-primary-foreground":"bg-secondary/80 text-secondary-foreground",s=e.status==="in_progress"?o.t("projectCard.statusInProgress"):o.t("projectCard.statusCompleted"),n=Array.isArray(e.context)?e.context:[e.context],i="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-[0_0_24px_-6px_hsl(174_60%_51%/0.15)]",c=t?"relative overflow-hidden h-[350px] bg-gray-900":"relative overflow-hidden aspect-[16/10] bg-gray-900",p=t?"flex flex-1 flex-col p-5 md:p-6":"flex flex-1 flex-col p-5",l=t?"font-semibold text-foreground transition-colors group-hover:text-primary text-xl":"font-semibold text-foreground transition-colors group-hover:text-primary text-lg",k=t?6:4,L=e.skills.slice(0,k),w=e.skills.length-k,M=e.dates?.year||e.year||2025;return`

        <a href="#/projects/${e.slug}"
        class="${i}"
        data-project-slug="${e.slug}"
      >
        <!-- Thumbnail -->
        <div class="${c}">
          <img
            src="${e.thumbnail||"/placeholder.svg"}"
            alt="${e.title}"
            class="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
          <!-- Status overlay -->
          <div class="absolute right-3 top-3">
            <span class="border-none text-xs backdrop-blur-md px-2 py-1 rounded-md ${r}">
              ${s}
            </span>
          </div>
        </div>

        <!-- Content -->
        <div class="${p}">
          <div class="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
            <span class="flex items-center gap-1">
              ${n.map(m=>`${this.contextIcons[m.toLowerCase()]}`).join("")}
              ${n.map(m=>this.contextLabels[m.toLowerCase()]).join(" / ")}
            </span>
            <span>/</span>
            <span class="flex items-center gap-1">
              <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              ${e.duration}
            </span>
            <span>/</span>
            <span>${M}</span>
          </div>

          <h3 class="${l}">
            <span class="flex items-center gap-1">
              ${e.title}
              <svg class="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7m0 0H7m10 0v10" />
              </svg>
            </span>
          </h3>

          <p class="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            ${e.snippet}
          </p>

          <!-- Skill tags -->
          <div class="mt-4 flex flex-wrap gap-1.5">
            ${L.map(m=>`
              <span class="text-xs font-normal text-muted-foreground border border-border rounded-md px-2 py-1">
                ${m}
              </span>
            `).join("")}
            ${w>0?`
              <span class="text-xs font-normal text-muted-foreground border border-border rounded-md px-2 py-1">
                +${w}
              </span>
            `:""}
          </div>
        </div>
      </a>
    `}}const b=new F;class q{constructor(){this.projects=[]}async init(){const t=await(await fetch(o.getDataPath("projects.json"))).json();this.projects=t.projects}render(){const e=this.projects.slice(0,4);return e.length===0?"":`
      <section id="featured-projects" class="px-6 py-24">
        <div class="mx-auto max-w-6xl">
          <div class="mb-12 flex items-end justify-between">
            <div>
              <p class="mb-2 font-mono text-sm tracking-wider text-primary">
                ${o.t("featured.commentTag")}
              </p>
              <h2 class="text-3xl font-bold text-foreground md:text-4xl">
                ${o.t("featured.title")}
              </h2>
            </div>

              <a href="#/projects"
              class="hidden items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary md:flex"
            >
              ${o.t("featured.viewAll")}
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          <!-- Featured grid: first project large, rest in grid -->
          <div class="flex flex-col gap-6">
            <!-- Hero project -->
            ${b.render(e[0],!0)}

            <!-- Grid of remaining -->
            ${e.length>1?`
              <div class="grid gap-6 grid-cols-1 md:grid-cols-2">
                ${e.slice(1).map(t=>b.render(t)).join("")}
              </div>
            `:""}
          </div>

          <div class="mt-8 flex justify-center md:hidden">

              <a href="#/projects"
              class="inline-flex items-center gap-1 rounded-lg border border-border px-5 py-2.5 text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              ${o.t("featured.viewAll")}
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    `}}const C=new q;class V{constructor(){this.skills=[],this.categories=[],this.activeCategory="all",this.totalProjects=0,this.originIcons={school:'<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>',personal:'<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>',association:'<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>',work:'<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>'}}get originLabels(){return{school:o.t("skills.legendSchool"),personal:o.t("skills.legendPersonal"),association:o.t("skills.legendAssociation"),work:o.t("skills.legendWork")}}async init(){const[e,t]=await Promise.all([fetch(o.getDataPath("skills.json")),fetch(o.getDataPath("projects.json"))]),r=await e.json(),s=await t.json();this.skills=r.skills,this.categories=r.categories,this.totalProjects=s.projects.length}getProjectCount(e){return e.projectSlugs.includes("all")?this.totalProjects:e.projectSlugs.length}renderSkillRow(e){const t=e.projectSlugs.length===0,r=e.status==="coming-soon",s=this.getProjectCount(e),n=t?"div":"a",i=t?"":`href="#/projects?skill=${encodeURIComponent(e.name)}"`;return`
    <${n}
      ${i}
      class="group flex items-center justify-between gap-3 rounded-full border border-border bg-secondary/30 px-4 py-2.5 transition-all ${t?"":"hover:border-primary hover:bg-secondary/50 hover:shadow-sm"} ${t?"cursor-default opacity-70":""}"
    >
      <!-- Skill name -->
      <span class="font-medium text-foreground transition-colors ${t?"":"group-hover:text-primary"} text-sm flex items-center gap-1.5">
        ${e.name}
        ${r?`<span title="${o.t("skills.dataComingSoon")}" class="text-amber-500 text-xs">&#128679;</span>`:""}
      </span>

      <div class="flex items-center gap-2 ml-auto">
        <!-- Origins -->
        <div class="flex items-center gap-1 text-muted-foreground">
          ${e.origin.map(p=>`
            <span title="${this.originLabels[p]}">
              ${this.originIcons[p]}
            </span>
          `).join("")}
        </div>

        <!-- Project count -->
        <div class="flex items-center gap-1 text-muted-foreground">
          ${t?'<span class="font-mono text-xs">—</span>':`<span class="font-mono text-xs">${s}</span>
               <svg class="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17L17 7m0 0H7m10 0v10" />
               </svg>`}
        </div>
      </div>
    </${n}>
  `}formatType(e){const t={language:"skills.typeLanguage",tool:"skills.typeTool",framework:"skills.typeFramework",software:"skills.typeSoftware","soft-skill":"skills.typeSoftSkill"};return t[e]?o.t(t[e]):e}renderCategoryCard(e,t){const r=[...t].sort((s,n)=>n.projectSlugs.length-s.projectSlugs.length);return`
      <div class="rounded-xl border border-border bg-card p-5">
        <div class="mb-4 flex items-center justify-between">
          <h3 class="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            ${e.label}
          </h3>
          <span class="rounded-md bg-secondary px-2 py-0.5 font-mono text-xs text-muted-foreground">
            ${t.length}
          </span>
        </div>
        <div class="flex flex-col gap-3">
          ${r.map(s=>this.renderSkillRow(s)).join("")}
        </div>
      </div>
    `}render(){const e=this.categories.filter(t=>t.value!=="all").map(t=>({...t,skills:this.activeCategory==="all"||this.activeCategory===t.value?this.skills.filter(r=>r.category===t.value):[]})).filter(t=>t.skills.length>0);return`
      <section id="competences" class="px-6 py-24">
        <div class="mx-auto max-w-6xl">
          <!-- Header -->
          <div class="mb-12">
            <p class="mb-2 font-mono text-sm tracking-wider text-primary">
              ${o.t("skills.commentTag")}
            </p>
            <h2 class="text-balance text-3xl font-bold text-foreground md:text-4xl">
              ${o.t("skills.title")}
            </h2>
            <p class="mt-3 max-w-xl leading-relaxed text-muted-foreground">
              ${o.t("skills.subtitle")}
            </p>
          </div>

          <!-- Category filters -->
          <div class="mb-8 flex flex-wrap gap-2" id="skills-category-filters">
            ${this.categories.map(t=>`
              <button
                type="button"
                data-category="${t.value}"
                class="skills-category-filter rounded-md px-3 py-1.5 text-sm transition-colors ${this.activeCategory===t.value?"bg-primary text-primary-foreground":"bg-secondary text-secondary-foreground hover:bg-secondary/80"}"
              >
                ${t.label}
              </button>
            `).join("")}
          </div>

          <!-- Category cards -->
          <div class="grid gap-6 md:grid-cols-2" id="skills-cards-container">
            ${e.map(t=>this.renderCategoryCard(t,t.skills)).join("")}
          </div>

          <!-- Legend -->
          <div class="mt-8 flex flex-wrap items-center gap-6 border-t border-border pt-6 text-xs text-muted-foreground">
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-1.5">
                ${this.originIcons.school}
                <span>${o.t("skills.legendSchool")}</span>
              </div>
              <div class="flex items-center gap-1.5">
                ${this.originIcons.personal}
                <span>${o.t("skills.legendPersonal")}</span>
              </div>
              <div class="flex items-center gap-1.5">
                ${this.originIcons.association}
                <span>${o.t("skills.legendAssociation")}</span>
              </div>
                <div class="flex items-center gap-1.5">
                ${this.originIcons.work}
                <span>${o.t("skills.legendWork")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    `}attachEvents(){document.querySelectorAll(".skills-category-filter").forEach(e=>{e.addEventListener("click",t=>{this.activeCategory=t.target.dataset.category,document.querySelectorAll(".skills-category-filter").forEach(r=>{r.classList.remove("bg-primary","text-primary-foreground"),r.classList.add("bg-secondary","text-secondary-foreground")}),t.target.classList.remove("bg-secondary","text-secondary-foreground"),t.target.classList.add("bg-primary","text-primary-foreground"),this.updateCardsDisplay()})})}updateCardsDisplay(){const e=this.categories.filter(r=>r.value!=="all").map(r=>({...r,skills:this.activeCategory==="all"||this.activeCategory===r.value?this.skills.filter(s=>s.category===r.value):[]})).filter(r=>r.skills.length>0),t=document.getElementById("skills-cards-container");t.innerHTML=e.map(r=>this.renderCategoryCard(r,r.skills)).join("")}}const g=new V;class G{constructor(){this.profile=y}render(){const e=[{label:"GitHub",href:"https://github.com/timothee-pirot",icon:'<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>'},{label:"LinkedIn",href:"https://www.linkedin.com/in/timotheepirot/",icon:'<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>'},{label:"Email",href:"mailto:t.pirot@free.fr",icon:'<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>'}];return`
      <footer id="contact" class="border-t border-border px-6 py-16">
        <div class="mx-auto max-w-6xl">
          <div class="grid gap-12 md:grid-cols-2">
            <!-- Contact CTA -->
            <div>
              <p class="mb-2 font-mono text-sm tracking-wider text-primary">
                ${o.t("footer.commentTag")}
              </p>
              <h2 class="text-2xl font-bold text-foreground md:text-3xl">
                ${o.t("footer.title")}
              </h2>
              <p class="mt-3 max-w-md leading-relaxed text-muted-foreground">
                ${o.td(this.profile.headline)}<br>
                ${o.t("footer.availability")} : ${o.td(this.profile.availability.startDate)} <br>
                ${o.t("footer.contactCTA")}
              </p>

                <a href="mailto:t.pirot@free.fr"
                class="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                ${o.t("footer.contactButton")}
              </a>
            </div>

            <!-- Links -->
            <div class="flex flex-col justify-between">
              <div>
                <p class="mb-4 text-sm font-medium text-foreground">
                  ${o.t("footer.findMeOn")}
                </p>
                <div class="flex gap-4">
                  ${e.map(t=>`

                      <a href="${t.href}"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all hover:border-primary hover:text-primary"
                      aria-label="${t.label}"
                    >
                      ${t.icon}
                    </a>
                  `).join("")}
                </div>
              </div>
            </div>
          </div>

          <!-- Bottom bar -->
          <div class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row">
            <p>
              ${o.t("footer.copyright")}
            </p>
            <p class="font-mono">
              ${o.t("footer.builtWith")}
            </p>
          </div>
        </div>
      </footer>
    `}}const u=new G;class _{async init(){await Promise.all([C.init(),g.init()])}render(){return`
      ${$.render()}
      ${C.render()}
      ${g.render()}
      ${u.render()}
    `}attachEvents(){$.attachEvents(),g.attachEvents()}}const f=new _;class N{constructor(){this.activeCategory="all",this.activeSkill="",this.sort="recent",this.search="",this.projects=[],this.skills=[],this.categories=[]}async init(){const[e,t]=await Promise.all([fetch(o.getDataPath("projects.json")).then(s=>s.json()),fetch(o.getDataPath("skills.json")).then(s=>s.json())]);this.projects=e.projects,this.categories=e.categories,this.skills=t.skills;const r=d.getQueryParam("skill");r&&(this.activeSkill=r)}render(){const e=Array.from(new Set(this.skills.map(t=>t.name))).sort();return`
      <div class="pt-20 container mx-auto px-6 py-12">
        <div class="mb-12">
          <p class="mb-2 font-mono text-sm tracking-wider text-primary">
            ${o.t("projectGrid.commentTag")}
          </p>
          <h1 class="text-balance text-3xl font-bold text-foreground md:text-4xl">
            ${o.t("projectGrid.title")}
          </h1>
        </div>

        <!-- Search & Sort row -->
        <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div class="relative flex-1 sm:max-w-xs">
            <svg class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              id="project-search"
              placeholder="${o.t("projectGrid.searchPlaceholder")}"
              value="${this.search}"
              class="w-full rounded-lg border border-border bg-secondary py-2 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div class="flex items-center gap-3">
            <label for="project-sort" class="text-xs text-muted-foreground">
              ${o.t("projectGrid.sortLabel")}
            </label>
            <select
              id="project-sort"
              class="rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
            >
              <option value="recent">${o.t("projectGrid.sortRecent")}</option>
              <option value="name">${o.t("projectGrid.sortName")}</option>
              <option value="duration">${o.t("projectGrid.sortDuration")}</option>
            </select>
          </div>
        </div>

        <!-- Category filters -->
        <div class="mb-4 flex flex-wrap gap-2" id="category-filters">
          ${this.categories.map(t=>`
            <button
              type="button"
              data-category="${t.value}"
              class="category-filter rounded-md px-3 py-1.5 text-sm transition-colors ${this.activeCategory===t.value?"bg-primary text-primary-foreground":"bg-secondary text-secondary-foreground hover:bg-secondary/80"}"
            >
              ${t.label}
            </button>
          `).join("")}
        </div>

        <!-- Skill filter -->
        <div class="mb-8 flex flex-wrap gap-2" id="skill-filters">
          ${this.activeSkill?`
            <button
              type="button"
              id="clear-skill"
              class="inline-flex items-center gap-1 rounded-md border border-primary bg-primary/10 px-3 py-1.5 text-sm text-primary"
            >
              ${this.activeSkill}
              <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          `:`
            <div class="flex flex-wrap gap-1.5">
              ${e.map(t=>`
                <button
                  type="button"
                  data-skill="${t}"
                  class="skill-filter rounded-md bg-muted px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  ${t}
                </button>
              `).join("")}
            </div>
          `}
        </div>

        <!-- Active filters summary -->
        <div id="filter-summary" class="mb-6"></div>

        <!-- Projects grid -->
        <div id="projects-container"></div>
      </div>
    `}getFilteredProjects(){let e=[...this.projects];if(this.activeCategory!=="all"&&(e=e.filter(t=>(Array.isArray(t.category)?t.category:[t.category]).includes(this.activeCategory))),this.activeSkill&&(e=e.filter(t=>t.skills.includes(this.activeSkill))),this.search){const t=this.search.toLowerCase();e=e.filter(r=>r.title.toLowerCase().includes(t)||r.snippet.toLowerCase().includes(t)||r.skills.some(s=>s.toLowerCase().includes(t)))}switch(this.sort){case"recent":e.sort((t,r)=>(r.dates?.year||r.year)-(t.dates?.year||t.year));break;case"name":e.sort((t,r)=>t.title.localeCompare(r.title));break;case"duration":e.sort((t,r)=>parseInt(r.duration)-parseInt(t.duration));break}return e}updateProjectsDisplay(){const e=this.getFilteredProjects(),t=document.getElementById("projects-container"),r=document.getElementById("filter-summary");if(this.activeCategory!=="all"||this.activeSkill!==""||this.search!==""){const n=(e.length===1?o.t("projectGrid.projectFound"):o.t("projectGrid.projectsFound")).replace("{count}",e.length);r.innerHTML=`
        <div class="flex items-center gap-3 text-sm text-muted-foreground">
          <span>
            ${n}
          </span>
          <button
            type="button"
            id="clear-filters"
            class="text-primary hover:underline"
          >
            ${o.t("projectGrid.clearFilters")}
          </button>
        </div>
      `}else r.innerHTML="";e.length>0?t.innerHTML=`
        <div class="grid gap-6 grid-cols-1 md:grid-cols-2">
          ${e.map(n=>b.render(n)).join("")}
        </div>
      `:t.innerHTML=`
        <div class="flex flex-col items-center justify-center py-20 text-center">
          <p class="text-lg font-medium text-foreground">
            ${o.t("projectGrid.noProjectsFound")}
          </p>
          <p class="mt-1 text-sm text-muted-foreground">
            ${o.t("projectGrid.noProjectsHint")}
          </p>
          <button
            type="button"
            id="clear-filters-empty"
            class="mt-4 text-sm text-primary hover:underline"
          >
            ${o.t("projectGrid.resetFilters")}
          </button>
        </div>
      `,this.attachFilterEvents()}attachEvents(){document.getElementById("project-search").addEventListener("input",r=>{this.search=r.target.value,this.updateProjectsDisplay()}),document.getElementById("project-sort").addEventListener("change",r=>{this.sort=r.target.value,this.updateProjectsDisplay()}),document.querySelectorAll(".category-filter").forEach(r=>{r.addEventListener("click",s=>{this.activeCategory=s.target.dataset.category,document.querySelectorAll(".category-filter").forEach(n=>{n.classList.remove("bg-primary","text-primary-foreground"),n.classList.add("bg-secondary","text-secondary-foreground")}),s.target.classList.remove("bg-secondary","text-secondary-foreground"),s.target.classList.add("bg-primary","text-primary-foreground"),this.updateProjectsDisplay()})}),document.querySelectorAll(".skill-filter").forEach(r=>{r.addEventListener("click",s=>{this.activeSkill=s.target.dataset.skill,this.updateProjectsDisplay();const n=document.getElementById("skill-filters");n.innerHTML=`
          <button
            type="button"
            id="clear-skill"
            class="inline-flex items-center gap-1 rounded-md border border-primary bg-primary/10 px-3 py-1.5 text-sm text-primary"
          >
            ${this.activeSkill}
            <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        `,this.attachFilterEvents()})}),this.attachFilterEvents()}attachFilterEvents(){const e=document.getElementById("clear-skill");e&&e.addEventListener("click",()=>{this.activeSkill="",this.updateProjectsDisplay(),this.renderSkillFilters()});const t=document.getElementById("clear-filters"),r=document.getElementById("clear-filters-empty");[t,r].forEach(s=>{s&&s.addEventListener("click",()=>{this.activeCategory="all",this.activeSkill="",this.search="",document.getElementById("project-search").value="",document.querySelectorAll(".category-filter").forEach(n=>{n.classList.remove("bg-primary","text-primary-foreground"),n.classList.add("bg-secondary","text-secondary-foreground")}),document.querySelector('[data-category="all"]').classList.remove("bg-secondary","text-secondary-foreground"),document.querySelector('[data-category="all"]').classList.add("bg-primary","text-primary-foreground"),this.updateProjectsDisplay(),this.renderSkillFilters()})})}renderSkillFilters(){const e=Array.from(new Set(this.skills.map(r=>r.name))).sort(),t=document.getElementById("skill-filters");t.innerHTML=`
      <div class="flex flex-wrap gap-1.5">
        ${e.map(r=>`
          <button
            type="button"
            data-skill="${r}"
            class="skill-filter rounded-md bg-muted px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            ${r}
          </button>
        `).join("")}
      </div>
    `,document.querySelectorAll(".skill-filter").forEach(r=>{r.addEventListener("click",s=>{this.activeSkill=s.target.dataset.skill,this.updateProjectsDisplay(),t.innerHTML=`
          <button
            type="button"
            id="clear-skill"
            class="inline-flex items-center gap-1 rounded-md border border-primary bg-primary/10 px-3 py-1.5 text-sm text-primary"
          >
            ${this.activeSkill}
            <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        `,this.attachFilterEvents()})})}}const h=new N;class O{async init(){await h.init()}render(){return`
      ${h.render()}
      ${u.render()}
    `}attachEvents(){h.attachEvents(),h.updateProjectsDisplay()}}const x=new O;class W{render(){const e=[{label:"Email",value:"t.pirot@free.fr",href:"mailto:t.pirot@free.fr",icon:'<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>',primary:!0},{label:"LinkedIn",value:"timotheepirot",href:"https://www.linkedin.com/in/timotheepirot/",icon:'<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>'},{label:"GitHub",value:"timothee-pirot",href:"https://github.com/timothee-pirot",icon:'<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>'}];return`
      <div class="pt-20 container mx-auto px-6 py-24 min-h-[60vh] flex items-center justify-center">
        <div class="text-center max-w-2xl w-full">
          <p class="mb-2 font-mono text-sm tracking-wider text-primary">
            ${o.t("contact.commentTag")}
          </p>
          <h1 class="text-4xl font-bold text-foreground mb-4">
            ${o.t("contact.title")}
          </h1>
          <p class="text-lg text-muted-foreground mb-12">
            ${o.t("contact.subtitle")}
          </p>

          <div class="grid gap-4 sm:grid-cols-3 max-w-xl mx-auto">
            ${e.map(t=>`
              <a href="${t.href}"
                ${t.primary?"":'target="_blank" rel="noopener noreferrer"'}
                class="flex flex-col items-center gap-3 rounded-xl border ${t.primary?"border-primary bg-primary/5":"border-border bg-card"} p-6 text-muted-foreground transition-all hover:border-primary hover:text-primary hover:shadow-lg"
              >
                ${t.icon}
                <span class="text-sm font-semibold text-foreground">${t.label}</span>
                <span class="text-xs text-muted-foreground">${t.value}</span>
              </a>
            `).join("")}
          </div>
        </div>
      </div>
      ${u.render()}
    `}}const Y=new W;class J{constructor(){this.project=null,this.contextIcons={school:'<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>',personal:'<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>',association:'<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>',work:'<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>'}}get contextLabels(){return{school:o.t("projectCard.contextSchool"),personal:o.t("projectCard.contextPersonal"),association:o.t("projectCard.contextAssociation"),work:o.t("projectCard.contextWork")}}async init(e){const r=await(await fetch(o.getDataPath("projects.json"))).json();this.project=r.projects.find(s=>s.slug===e),this.project||console.error(`Project not found: ${e}`)}render(){if(!this.project)return`
        <div class="pt-20 container mx-auto px-6 py-24 min-h-[60vh] flex items-center justify-center">
          <div class="text-center">
            <h1 class="text-4xl font-bold text-foreground mb-4">${o.t("projectDetail.notFoundTitle")}</h1>
            <p class="text-lg text-muted-foreground mb-8">${o.t("projectDetail.notFoundText")}</p>
            <a href="#/projects" class="inline-flex items-center gap-2 text-primary hover:underline">
              ← ${o.t("projectDetail.backToProjects")}
            </a>
          </div>
        </div>
        ${u.render()}
      `;const e=this.project.dates?.year||this.project.year||2025,t=this.project.status==="in_progress"?"bg-primary text-primary-foreground":"bg-secondary text-secondary-foreground",r=this.project.status==="in_progress"?o.t("projectCard.statusInProgress"):o.t("projectCard.statusCompleted"),s=Array.isArray(this.project.context)?this.project.context:[this.project.context],n=(this.project.links||[]).filter(i=>i!==null&&i?.url);return`
      <div class="pt-20 container mx-auto px-6 py-12">
        <!-- Back button -->
        <a href="#/projects" class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          ${o.t("projectDetail.backToProjects")}
        </a>

        <!-- Project header -->
        <div class="mb-8">
          <div class="flex flex-wrap items-center gap-3 mb-4">
            <span class="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              ${s.map(i=>this.contextIcons[i.toLowerCase()]).join("")}
              ${s.map(i=>this.contextLabels[i.toLowerCase()]).join(" / ")}
            </span>
            <span class="text-muted-foreground">•</span>
            <span class="text-sm text-muted-foreground">${e}</span>
            <span class="text-muted-foreground">•</span>
            <span class="text-sm text-muted-foreground">
              <svg class="h-3.5 w-3.5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              ${this.project.duration}
            </span>
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs ${t}">
              ${r}
            </span>
          </div>

          <h1 class="text-4xl font-bold text-foreground mb-4">${this.project.title}</h1>
          <p class="text-xl text-muted-foreground max-w-3xl">${this.project.snippet}</p>
        </div>

        <!-- Main image -->
        ${this.project.thumbnail?`
          <div class="mb-12 rounded-xl overflow-hidden border border-border">
            <img src="${this.project.thumbnail}" alt="${this.project.title}" class="w-full max-h-[500px] object-contain" />
          </div>
        `:""}

        <!-- Layout: Content + Sidebar -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main content (left, 2/3) -->
          <div class="lg:col-span-2">
            <!-- Description sections -->
            <div class="grid gap-8">
              ${this.renderSection("01",o.t("projectDetail.sectionContexte"),this.project.description.contexte)}
              ${this.renderSection("02",o.t("projectDetail.sectionChallenge"),this.project.description.challenge)}
              ${this.renderSection("03",o.t("projectDetail.sectionSolution"),this.project.description.solution)}
              ${this.renderSection("04",o.t("projectDetail.sectionResults"),this.project.description.results)}
              ${this.renderSection("05",o.t("projectDetail.sectionCompetences"),this.project.description.competences)}
            </div>

            <!-- Gallery -->
            ${this.project.gallery&&this.project.gallery.length>0?`
              <div class="mt-16">
                <h2 class="text-2xl font-bold text-foreground mb-6">${o.t("projectDetail.gallery")}</h2>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                  ${this.project.gallery.map((i,c)=>`
                    <button type="button" data-gallery-index="${c}" class="gallery-thumb rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-colors cursor-pointer">
                      <img src="${i}" alt="${this.project.title}" class="w-full h-32 object-cover" />
                    </button>
                  `).join("")}
                </div>
              </div>
            `:""}
          </div>

          <!-- Sidebar (right, 1/3) -->
          <div class="lg:col-span-1">
            <div class="sticky top-24 flex flex-col gap-6">
              <!-- Informations card -->
              <div class="rounded-xl border border-border bg-card p-5">
                <h3 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  ${o.t("projectDetail.infoTitle")}
                </h3>
                <div class="flex flex-col gap-3">
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-muted-foreground">${o.t("projectDetail.infoStatus")}</span>
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs ${t}">
                      ${r}
                    </span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-muted-foreground">${o.t("projectDetail.infoContext")}</span>
                    <span class="inline-flex items-center gap-1.5 text-sm text-foreground">
                      ${s.map(i=>this.contextIcons[i.toLowerCase()]).join("")}
                      ${s.map(i=>this.contextLabels[i.toLowerCase()]).join(" / ")}
                    </span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-muted-foreground">${o.t("projectDetail.infoYear")}</span>
                    <span class="text-sm text-foreground">${e}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-sm text-muted-foreground">${o.t("projectDetail.infoDuration")}</span>
                    <span class="text-sm text-foreground">${this.project.duration}</span>
                  </div>
                </div>
              </div>

              <!-- Skills card -->
              <div class="rounded-xl border border-border bg-card p-5">
                <h3 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  ${o.t("projectDetail.skillsTitle")}
                </h3>
                <div class="flex flex-wrap gap-2">
                  ${this.project.skills.map(i=>`
                    <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-secondary text-xs text-foreground">
                      <span class="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      ${i}
                    </span>
                  `).join("")}
                </div>
              </div>

              <!-- Links card -->
              ${n.length>0?`
                <div class="rounded-xl border border-border bg-card p-5">
                  <h3 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                    ${o.t("projectDetail.linksTitle")}
                  </h3>
                  <div class="flex flex-col gap-2">
                    ${n.map(i=>`

                        <a href="${i.url}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
                      >
                        <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        ${i.label}
                      </a>
                    `).join("")}
                  </div>
                </div>
              `:""}
            </div>
          </div>
        </div>

        <!-- Back to projects -->
        <div class="mt-16 pt-8 border-t border-border">
          <a href="#/projects" class="inline-flex items-center gap-2 text-primary hover:underline">
            ← ${o.t("projectDetail.viewAllProjects")}
          </a>
        </div>
      </div>

      <!-- Lightbox -->
      ${this.project.gallery&&this.project.gallery.length>0?`
        <div id="lightbox" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/80 backdrop-blur-sm">
          <!-- Close button -->
          <button type="button" id="lightbox-close" class="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Prev button -->
          ${this.project.gallery.length>1?`
            <button type="button" id="lightbox-prev" class="absolute left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          `:""}

          <!-- Image -->
          <img id="lightbox-img" src="" alt="" class="max-h-[85vh] max-w-[90vw] rounded-lg object-contain" />

          <!-- Next button -->
          ${this.project.gallery.length>1?`
            <button type="button" id="lightbox-next" class="absolute right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          `:""}

          <!-- Counter -->
          ${this.project.gallery.length>1?`
            <div id="lightbox-counter" class="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-sm text-white"></div>
          `:""}
        </div>
      `:""}

      ${u.render()}
    `}attachEvents(){if(!this.project?.gallery?.length)return;const e=document.getElementById("lightbox"),t=document.getElementById("lightbox-img"),r=document.getElementById("lightbox-counter"),s=this.project.gallery;let n=0;const i=l=>{n=(l+s.length)%s.length,t.src=s[n],t.alt=`${this.project.title} - ${n+1}`,r&&(r.textContent=`${n+1} / ${s.length}`)},c=l=>{i(l),e.classList.remove("hidden"),e.classList.add("flex"),document.body.style.overflow="hidden"},p=()=>{e.classList.add("hidden"),e.classList.remove("flex"),document.body.style.overflow=""};document.querySelectorAll(".gallery-thumb").forEach(l=>{l.addEventListener("click",()=>c(parseInt(l.dataset.galleryIndex)))}),document.getElementById("lightbox-close")?.addEventListener("click",p),e.addEventListener("click",l=>{l.target===e&&p()}),document.getElementById("lightbox-prev")?.addEventListener("click",l=>{l.stopPropagation(),i(n-1)}),document.getElementById("lightbox-next")?.addEventListener("click",l=>{l.stopPropagation(),i(n+1)}),this._keyHandler=l=>{e.classList.contains("hidden")||(l.key==="Escape"&&p(),l.key==="ArrowLeft"&&i(n-1),l.key==="ArrowRight"&&i(n+1))},document.addEventListener("keydown",this._keyHandler)}renderSection(e,t,r){if(!r||!r.show)return"";const s=Array.isArray(r.content)?`<ul class="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed">${r.content.map(n=>`<li>${n}</li>`).join("")}</ul>`:`<p class="text-muted-foreground leading-relaxed">${r.content}</p>`;return`
      <div class="rounded-xl border border-border bg-card p-6">
        <div class="flex items-center gap-3 mb-4">
          <span class="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary font-mono text-sm font-semibold">
            ${e}
          </span>
          <h2 class="text-xl font-semibold text-foreground">${t}</h2>
        </div>
        ${s}
      </div>
    `}}const v=new J;class Q{constructor(){this.profile=y}render(){const e=[{title:o.t("about.docRoboticsTitle"),description:o.t("about.docRoboticsDesc"),file:"/portfolio-timothee-pirot/documents/cv-robotique-timothee-pirot.pdf",icon:'<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>'},{title:o.t("about.docDevTitle"),description:o.t("about.docDevDesc"),file:"/portfolio-timothee-pirot/documents/cv-dev-timothee-pirot.pdf",icon:'<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>'}];return`
      <div class="pt-20 container mx-auto px-6 py-16">
        <!-- Titre + intro -->
        <div class="max-w-3xl mx-auto mb-16">
          <p class="mb-2 font-mono text-sm tracking-wider text-primary">
            ${o.t("about.commentTag")}
          </p>
          <h1 class="text-4xl font-bold text-foreground mb-4">
            Timothée Pirot
          </h1>
          <p class="text-lg text-muted-foreground leading-relaxed">
            ${o.td(this.profile.headline)}<br>
            ${o.t("about.availability")} : ${o.td(this.profile.availability.startDate)}
          </p>
        </div>

        <!-- Section Documents -->
        <div class="max-w-3xl mx-auto mb-16">
          <h2 class="text-2xl font-bold text-foreground mb-6">
            ${o.t("about.documentsTitle")}
          </h2>
          <div class="grid gap-4 sm:grid-cols-2">
            ${e.map(t=>`
              <div class="rounded-xl border border-border bg-card p-6 flex flex-col gap-4">
                <div class="flex items-center gap-3 text-primary">
                  ${t.icon}
                  <h3 class="text-lg font-semibold text-foreground">${t.title}</h3>
                </div>
                <p class="text-sm text-muted-foreground leading-relaxed">
                  ${t.description}
                </p>
                <a href="${t.file}" download
                  class="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 self-start"
                >
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  ${o.t("about.download")}
                </a>
              </div>
            `).join("")}
          </div>
        </div>
      </div>

      ${u.render()}
    `}attachEvents(){}}const U=new Q;document.addEventListener("DOMContentLoaded",async()=>{await o.init(),await j.init();const a=document.getElementById("app");d.addRoute("/",async()=>{await f.init(),a.innerHTML=f.render(),f.attachEvents(),window.scrollTo(0,0)}),d.addRoute("/projects",async()=>{await x.init(),a.innerHTML=x.render(),x.attachEvents(),window.scrollTo(0,0)}),d.addRoute("/projects/:slug",async e=>{await v.init(e.slug),a.innerHTML=v.render(),v.attachEvents(),window.scrollTo(0,0)}),d.addRoute("/moi",()=>{a.innerHTML=U.render(),window.scrollTo(0,0)}),d.addRoute("/contact",()=>{a.innerHTML=Y.render(),window.scrollTo(0,0)}),o.onLocaleChange(()=>{j.reRender(),d.handleRoute()}),d.handleRoute()});
