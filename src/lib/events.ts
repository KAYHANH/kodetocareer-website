"use client";

/**
 * Global helper function to trigger the Admissions Popup from anywhere in the application.
 * @param courseTitle Optional name of the course to pre-select in the form dropdown.
 */
export function openEnrollmentModal(courseTitle?: string) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('open-admissions-popup', {
        detail: { courseTitle }
      })
    );
  }
}
