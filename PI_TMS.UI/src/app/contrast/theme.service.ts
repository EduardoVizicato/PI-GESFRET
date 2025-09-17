import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private isDark = false;

  toggleTheme(): void {
    this.isDark = !this.isDark;
    const themeClass = this.isDark ? 'dark-theme' : 'light-theme';
    document.body.className = themeClass;
  }

  setDarkMode(dark: boolean): void {
    this.isDark = dark;
    document.body.className = dark ? 'dark-theme' : 'light-theme';
  }

  isDarkMode(): boolean {
    return this.isDark;
  }

}





