import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private isDark = false;

  private applyThemeClasses(): void {
    const themeClass = this.isDark ? 'dark-theme' : 'light-theme';
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(themeClass);

    const bsTheme = this.isDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-bs-theme', bsTheme);
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
    this.applyThemeClasses();
  }

  setDarkMode(dark: boolean): void {
    this.isDark = dark;
    this.applyThemeClasses();
  }

  isDarkMode(): boolean {
    return this.isDark;
  }
}





