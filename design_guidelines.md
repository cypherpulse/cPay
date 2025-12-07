# cPay Design Guidelines

## Design Approach

**Reference-Based Approach** drawing from modern Web3 wallets (Rainbow, Phantom) combined with social payment apps (Venmo, Cash App) to create a trustworthy yet friendly social money experience.

### Core Design Principles
1. **Mobile-First Trust**: Financial clarity with approachable social elements
2. **Progressive Disclosure**: Complex crypto operations simplified through clear hierarchy
3. **Social Context**: Money movements feel conversational, not transactional

---

## Typography

**Font System**: Inter (primary), JetBrains Mono (addresses/amounts)

- **Display**: 32px/bold - page titles, hero statements
- **H1**: 24px/semibold - dashboard sections
- **H2**: 20px/semibold - card headers, tab labels  
- **Body Large**: 16px/regular - primary content, form labels
- **Body**: 14px/regular - descriptions, secondary text
- **Caption**: 12px/regular - timestamps, helper text
- **Mono**: 14px/mono - wallet addresses (truncate with ellipsis), amounts

---

## Layout System

**Spacing Scale**: Tailwind units 2, 3, 4, 6, 8, 12, 16 (p-2, gap-4, mb-8, etc.)

**Container Strategy**:
- Max-width: 1280px for desktop dashboard
- Full-width on mobile with px-4 side padding
- Cards/components: p-6 on desktop, p-4 on mobile

**Responsive Breakpoints**:
- Mobile: default (< 768px) - single column, stacked navigation
- Tablet: md (768px+) - 2-column grids where appropriate
- Desktop: lg (1024px+) - full multi-column dashboard

---

## Component Library

### Navigation & Structure

**Header** (sticky, full-width):
- cPay logo (left) with gradient icon treatment
- Network indicator badge (Celo Mainnet/Alfajores)
- Wallet button (right): Connected shows truncated address (0x1234...5678) with balance pill, Disconnected shows "Connect Wallet"
- Mobile: Collapse to hamburger at md breakpoint

**Dashboard Layout**:
- Vertical tab navigation (left sidebar on lg+, horizontal tabs on mobile)
- Tab icons + labels: Overview (home), Pay (arrow-up), Invoices (document), Feed (activity), Settings (gear)
- Active tab: filled icon with accent border
- Main content area with py-6 px-4 (mobile) to py-8 px-8 (desktop)

### Cards & Containers

**Balance Cards** (Overview):
- Gradient background treatment per token (CELO native gradient, cUSD stable gradient)
- Large token amount with mono font: "1,234.56"
- Token symbol below in caption
- Icon (token logo) top-left, optional trend micro-chart top-right

**Transaction Cards** (Feed):
- Avatar circle (left): generic user icon or generated gradient for address
- Content (center): Bold action ("Sent to", "Received from", "Invoice paid") + truncated address/username
- Amount (right): +/- indicator with token symbol
- Note/message below in muted text (max 2 lines, truncate)
- Timestamp caption at bottom
- Divider between items (subtle)

**Invoice Cards** (Invoices tab):
- Status badge top-right: Pending (amber), Paid (green), Expired (gray)
- Invoice ID in mono font
- Amount (large) with token indicator
- Payer/description in body text
- Action button bottom-right: "Pay Invoice" or "View Details"

### Forms & Inputs

**Input Fields**:
- Floating labels that move up on focus
- Border: 1px solid, rounded-lg (8px)
- Height: h-12 minimum for touch targets
- Focus state: thicker border, no color change (per constraints)
- Helper text below in caption size

**Token Selector**:
- Segmented control style (pill group)
- Options: CELO | cUSD
- Selected state: filled background, unselected: outline only
- Icons for each token inline with label

**Amount Input**:
- Large text (20px) in mono font
- Max/Balance helper link top-right
- Show fiat equivalent below in muted caption

**Send/Request Forms**:
- Recipient field with address validation indicator
- Amount input with token selector integrated
- Note/message field (textarea, max 2-3 lines visible)
- Action button full-width on mobile, inline on desktop

### Buttons

**Primary Actions**: 
- Large (h-12), rounded-lg, full-width on mobile, min-w-32 on desktop
- Text: 16px semibold

**Secondary Actions**:
- Outlined version, same sizing

**Icon Buttons**:
- Square (h-10 w-10), rounded-full for avatars/social actions

### Tables

**Invoice Table**:
- Horizontal scroll on mobile
- Columns: ID (mono), Amount, Token (icon+text), Payer (truncate), Status (badge), Date, Actions
- Row hover: subtle background fill
- Sticky header on scroll
- Mobile: Convert to card list (stack columns vertically)

### Overlays

**Modals/Drawers**:
- Slide-up drawer on mobile (full height)
- Centered modal on desktop (max-w-lg)
- Header: title (H2) + close button
- Content: p-6, scrollable if needed
- Footer: action buttons right-aligned on desktop, full-width stack on mobile

**Toasts/Notifications**:
- Bottom-center on mobile, top-right on desktop
- Auto-dismiss after 5s, manual close option
- Icons: success (checkmark), error (x), info (i)
- Multi-line support for transaction confirmations

### Social Feed

**Feed Container**:
- Infinite scroll pattern
- Loading skeleton (3-4 placeholder cards)
- Empty state: illustration + "No activity yet" message

**Filter Tabs** (above feed):
- Horizontal scroll chips: All, Sent, Received, Invoices
- Active chip: filled, inactive: outlined

---

## Images

**Home/Landing Hero**:
- Large hero image (60vh on desktop, 40vh mobile) showing stylized crypto/payment visualization
- Image description: Abstract 3D rendered scene with floating coins, payment cards, and network connections in gradient space - conveys modern financial technology
- Overlay: Semi-transparent gradient (bottom to top) for text legibility
- Hero content: Centered headline "Send Money Like a Message" + subtitle + CTA button with blur background

**Dashboard**:
- No hero images - utility-focused interface
- Token icons (SVG) throughout balance cards
- Avatar placeholders in transaction feed (can be gradient-generated from address hash)

---

## Special Considerations

**Wallet Connection States**:
- Disconnected: Large centered prompt with "Connect Wallet" button
- Wrong Network: Warning banner (amber) with "Switch to Celo" action
- Connected: Show all dashboard functionality

**Mock Mode Indicator**:
- Settings toggle: clear ON/OFF state
- When enabled, subtle badge in header: "Mock Mode" with icon
- Warning: "Using simulated data" in caption

**Loading States**:
- Skeleton screens for balance cards (pulse animation)
- Spinner for transaction submissions
- Progress indicator for invoice payments

**Mobile Optimization**:
- Bottom navigation bar alternative for main tabs (optional based on testing)
- Floating action button for quick "Send" action
- Swipe gestures for tab navigation
- Larger touch targets (min 44px height)

**Accessibility**:
- High contrast between text and backgrounds
- Clear focus indicators (maintain throughout)
- All interactive elements keyboard accessible
- Screen reader labels for icons and status badges