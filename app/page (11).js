.hero { background: #BF9675; padding: 5rem 2rem 3rem; }
.content { padding: 4rem 0 6rem; }
.layout { display: grid; grid-template-columns: 220px 1fr; gap: 5rem; }
.nav { position: sticky; top: 140px; height: fit-content; display: flex; flex-direction: column; gap: 0.5rem; }
.navLink { font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(0,0,0,0.4); padding: 0.5rem 0; border-left: 2px solid transparent; padding-left: 1rem; transition: all 0.2s; }
.navLink:hover { color: #BF9675; border-left-color: #BF9675; }
.articles { display: flex; flex-direction: column; gap: 4rem; }
.article { padding-bottom: 4rem; border-bottom: 0.5px solid rgba(0,0,0,0.08); }
.article:last-child { border-bottom: none; }
.articleTitle { font-family: 'Cormorant Garamond',serif; font-size: 2rem; font-weight: 300; margin-bottom: 2rem; color: #1a1a1a; }
.list { list-style: none; display: flex; flex-direction: column; gap: 1rem; }
.list li { font-size: 14px; line-height: 1.9; color: rgba(0,0,0,0.65); padding-left: 1.5rem; position: relative; }
.list li::before { content: '—'; position: absolute; left: 0; color: #BF9675; opacity: 0.6; }
@media (max-width: 768px) { .layout { grid-template-columns: 1fr; } .nav { position: static; flex-direction: row; flex-wrap: wrap; } }
