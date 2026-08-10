// footnote-hover.js

function getMaxWidth(linkRect) {
  const margin = 16;
  const spaceRight = window.innerWidth - linkRect.left - margin;
  const spaceLeft = linkRect.right - margin;
  const available = Math.max(spaceRight, spaceLeft);
  return Math.min(available, 320); // cap at a sensible max, tweak to taste
}


function initFootnotePopovers() {
if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  document.querySelectorAll('a[href^="#user-content-fn"]').forEach((link) => {
    // avoid double-initializing on view-transition navigations
    if (link.dataset.footnoteInit) return;
    link.dataset.footnoteInit = 'true';

    const targetId = link.getAttribute('href').slice(1);
    const footnoteEl = document.getElementById(targetId);
    if (!footnoteEl) return;

    // clone so we don't touch the real footnote section
    const clone = footnoteEl.cloneNode(true);
    clone.querySelectorAll('.footnote-num-backref').forEach(el => el.remove());

    const tooltip = document.createElement('div');
    tooltip.className = 'footnote-tooltip';
    tooltip.innerHTML = clone.innerHTML;

    document.body.appendChild(tooltip); // append to body, not the link, so it's not clipped by overflow:hidden containers

    function showTooltip() {
        const linkRect = link.getBoundingClientRect();
        tooltip.style.maxWidth = `${getMaxWidth(linkRect)}px`;

        const tooltipRect = tooltip.getBoundingClientRect();
        const margin = 8;
        const spaceAbove = linkRect.top;
        const spaceBelow = window.innerHeight - linkRect.bottom;
        const showBelow = spaceAbove < tooltipRect.height + margin && spaceBelow > spaceAbove;
        const top = showBelow
            ? linkRect.bottom + window.scrollY + margin
            : linkRect.top + window.scrollY - tooltipRect.height - margin;
        let left = linkRect.left + window.scrollX;
        const wouldOverflowRight = linkRect.left + tooltipRect.width + margin > window.innerWidth;
        if (wouldOverflowRight) left = linkRect.right + window.scrollX - tooltipRect.width;
        left = Math.max(margin, left);
        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;

        requestAnimationFrame(() => {
            tooltip.classList.add('is-visible');
        });
    }

    function hideTooltip() {
        tooltip.classList.remove('is-visible');
    }

    let showTimer = null;
    let hideTimer = null;

    function scheduleShow() {
        clearTimeout(hideTimer); // cancel any pending hide
        showTimer = setTimeout(showTooltip, 100); // delay before appearing
    }

    function scheduleHide() {
        clearTimeout(showTimer); // cancel any pending show
        hideTimer = setTimeout(hideTooltip, 250); // delay before disappearing
    }

    link.addEventListener('mouseenter', scheduleShow);
    link.addEventListener('mouseleave', scheduleHide);
    tooltip.addEventListener('mouseenter', scheduleShow); // re-entering the tooltip cancels the pending hide
    tooltip.addEventListener('mouseleave', scheduleHide);
  });
}

initFootnotePopovers();
document.addEventListener('astro:page-load', initFootnotePopovers);