export class FlashNotifications {
  constructor() {
    this.notifications = []
    this.visibleNotifications = new Set()
    this.init()
  }

  init() {
    this.setupExistingNotifications()
    this.setupGlobalListener()
  }

  setupExistingNotifications() {
    const notifications = document.querySelectorAll('.flash-notification')
    this.notifications = Array.from(notifications)

    if (this.notifications.length > 0) {
      this.notifications.forEach((notification, index) => {
        this.prepareNotification(notification)
        
        setTimeout(() => {
          this.showNotification(notification, index)
        }, 200 * index)
      })
    }
  }

  prepareNotification(notification) {
    notification.classList.add('hide')
    notification.classList.remove('show')
  }

  showNotification(notification, index) {
    const verticalOffset = index * 100
    notification.style.bottom = `${20 + verticalOffset}px`

    notification.classList.remove('hide')
    notification.classList.add('show')

    this.visibleNotifications.add(notification)

    const hideTimeout = setTimeout(() => {
      this.hideNotification(notification)
    }, 3000)

    notification.dataset.hideTimeout = hideTimeout

    this.setupCloseButton(notification)
  }

  setupCloseButton(notification) {
    const closeBtn = notification.querySelector('.btn-close')
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        const hideTimeout = notification.dataset.hideTimeout
        if (hideTimeout) {
          clearTimeout(hideTimeout)
        }
        this.hideNotification(notification)
      })
    }
  }

  hideNotification(notification) {
    if (!this.visibleNotifications.has(notification)) return

    notification.classList.remove('show')
    notification.classList.add('hide')

    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
        this.visibleNotifications.delete(notification)
        this.reorganizeVisibleNotifications()
      }
    }, 500)
  }

  reorganizeVisibleNotifications() {
    const remaining = Array.from(this.visibleNotifications)
    remaining.forEach((notification, index) => {
      const verticalOffset = index * 100
      notification.style.bottom = `${20 + verticalOffset}px`
    })
  }

  addNotification(message, type = 'info', title = null) {
    const notification = this.createNotificationElement(message, type, title)
    document.body.appendChild(notification)

    const index = this.visibleNotifications.size
    this.prepareNotification(notification)

    setTimeout(() => {
      this.showNotification(notification, index)
    }, 100)

    return notification
  }

  createNotificationElement(message, type, title = null) {
    const notification = document.createElement('div')
    notification.className = `flash-notification toast flash-${type}`

    const defaultTitles = {
      'success': 'Éxito',
      'error': 'Error',
      'info': 'Información',
      'warning': 'Advertencia'
    }

    const notificationTitle = title || defaultTitles[type] || 'Notificación'
    const bgClass = type === 'warning' ? 'bg-warning' : `bg-${type} text-bg-${type}`

    notification.innerHTML = `
      <div class="toast-header ${bgClass}">
        <strong class="me-auto">${notificationTitle}</strong>
        <button type="button" class="btn-close" aria-label="Close"></button>
      </div>
      <div class="toast-body">
        ${message}
      </div>
    `

    return notification
  }

  clearAll() {
    this.visibleNotifications.forEach(notification => {
      const hideTimeout = notification.dataset.hideTimeout
      if (hideTimeout) {
        clearTimeout(hideTimeout)
      }
      this.hideNotification(notification)
    })
  }

  setupGlobalListener() {
    document.addEventListener('flash-notification', (event) => {
      const { message, type, title } = event.detail
      this.addNotification(message, type, title)
    })
  }
}