export interface CalendarEvent {
  title: string;
  description: string;
  location: string;
  startTime: string; // ISO 8601 with offset e.g. 2026-11-22T07:30:00+05:30
  endTime: string;   // ISO 8601 with offset e.g. 2026-11-22T09:00:00+05:30
}

/**
 * Convert ISO string to UTC format required by Google Calendar & ICS (YYYYMMDDTHHmmssZ)
 */
function toUTCFormat(isoString: string): string {
  const date = new Date(isoString);
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

/**
 * Generate Google Calendar URL
 */
export function generateGoogleCalendarUrl(event: CalendarEvent): string {
  const startUtc = toUTCFormat(event.startTime);
  const endUtc = toUTCFormat(event.endTime);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${startUtc}/${endUtc}`,
    details: event.description,
    location: event.location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Generate and trigger download of an .ics calendar file
 */
export function downloadIcsFile(event: CalendarEvent, filename: string = "deivendran-weds-akshaya.ics") {
  const startUtc = toUTCFormat(event.startTime);
  const endUtc = toUTCFormat(event.endTime);
  const nowUtc = toUTCFormat(new Date().toISOString());

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Deivendran & Akshaya Wedding Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:wedding-${Date.now()}@da-wedding-invitation`,
    `DTSTAMP:${nowUtc}`,
    `DTSTART:${startUtc}`,
    `DTEND:${endUtc}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, "\\n")}`,
    `LOCATION:${event.location}`,
    "STATUS:CONFIRMED",
    "BEGIN:VALARM",
    "TRIGGER:-PT24H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Reminder: Deivendran & Akshaya Wedding Tomorrow",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}
