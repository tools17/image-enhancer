// Ad management and tracking
class AdManager {
    constructor() {
        this.adContainers = document.querySelectorAll('.ad-container');
        this.adModal = document.getElementById('ad-modal');
    }
    
    init() {
        this.loadAds();
        this.setupAdTracking();
    }
    
    loadAds() {
        // Google AdSense initialization
        (adsbygoogle = window.adsbygoogle || []).push({});
        
        // Adsterra initialization
        if(typeof window.adsterra === 'function') {
            window.adsterra.init();
        }
    }
    
    setupAdTracking() {
        // Track ad impressions and clicks
        document.querySelectorAll('.ad-container').forEach(container => {
            container.addEventListener('click', () => {
                this.trackAdClick(container.dataset.adId);
            });
        });
    }
    
    trackAdClick(adId) {
        // Send analytics data
        console.log(`Ad ${adId} clicked`);
        if(typeof gtag !== 'undefined') {
            gtag('event', 'ad_click', {
                'event_category': 'ads',
                'event_label': adId
            });
        }
    }
    
    showAdModal() {
        // Display ad modal with countdown
        this.adModal.style.display = 'flex';
        
        // Initialize ad in modal
        if(typeof window.adsterra === 'function') {
            window.adsterra.loadModalAd();
        }
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    const adManager = new AdManager();
    adManager.init();
});
