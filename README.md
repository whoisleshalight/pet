# Portfolio

React + TypeScript + Vite. React Router відповідає за сторінки, GSAP — за анімацію HomeIntro та хедера.

## Запуск

```sh
npm install
npm run dev
npm run build
npm run lint
```

У PowerShell, якщо запуск `npm.ps1` заборонений політикою Windows, використовуй `npm.cmd` замість `npm`.

## Структура

```text
src/
  app/
    layouts/SiteLayout.tsx       Спільний хедер, контент, заголовок вкладки й відновлення прокрутки
    router/applicationRouter.ts Маршрути й відкладене завантаження сторінок
    router/routePaths.ts         Адреси для посилань і маршрутів
    scroll/useSmoothScroll.ts   ScrollSmoother і оновлення розмірів після переходів
    scroll/SmoothScroll.tsx     Контейнер вмісту, що оновлюється перед ScrollRestoration
  components/
    header/                     Хедер, навігація та окремий hook анімації
    home-intro/                 HomeIntro та окремий hook анімації
  config/portfolio.ts           Ім’я, опис, статус доступності та email
  lib/animation.ts              Налаштування GSAP і відстань анімації прокрутки
  lib/scroll.ts                 Повернення нагору через ScrollSmoother або звичайну прокрутку
  pages/
    home/                       Головна сторінка
    about/                      Про мене
    contact/                    Контакти
    not-found/                  Невідома адреса
    route-error/                Помилки завантаження сторінок
```

## Маршрути

- `/` — головна сторінка.
- `/about` — про мене.
- `/contact` — контакти.
- Невідомі адреси показують сторінку 404 зі спільним хедером.

Сторінки завантажуються окремими JavaScript-файлами. Спільний layout не перемонтовується під час переходів. Для внутрішніх переходів використовуються `Link` і `NavLink`.

### Як додати сторінку

1. Створи папку у `src/pages` і компонент із повною назвою, наприклад `ProjectsPage.tsx`.
2. Додай адресу `projects: '/projects'` у `routePaths.ts`.
3. Додай дочірній маршрут у `applicationRouter.ts`: `path`, `handle.title` і `lazy` за прикладом About.
4. За потреби додай пункт у `navigationItems` у `Header.tsx`.

Для вкладених розділів додавай `children` до відповідного маршруту й `Outlet` до його layout. Базовий layout, 404 та обробник помилок уже налаштовані.

## Вміст і вигляд

HomeIntro відтворює композицію, типографіку, адаптивні розміри та перехід великого імені в компактний хедер із [сайту-прикладу](https://erichuguenin.com/en/). Ім’я й опис залишені з референсу. Перед публікацією заміни їх і демонстраційний `hello@example.com` у `src/config/portfolio.ts`.

Шрифти зберігаються локально в `public/fonts`; під час роботи сайт не звертається до референсу. На екранах до 1024px та при `prefers-reduced-motion: reduce` анімація прокрутки вимкнена. GSAP прибирає анімації та ScrollTrigger при виході зі сторінки.

Після HomeIntro є короткий блок контакту, який дає простір для переходу до компактного хедера. Його можна замінити секцією власних проєктів у `HomePage.tsx`.

## Плавна прокрутка

ScrollSmoother підключений у спільному layout через `useSmoothScroll`. На екранах від 1025px він згладжує прокрутку; інтенсивність задається параметром `smooth` у цьому hook. На мобільних та при `prefers-reduced-motion: reduce` використовується звичайна прокрутка.

Хедер розташований поза контейнером, який рухає ScrollSmoother. HomeIntro закріплюється через ScrollTrigger, тому його анімація працює всередині цього контейнера. Один екземпляр ScrollSmoother працює протягом життя layout. Після зміни маршруту оновлюються розміри та позиція з `ScrollRestoration`; при демонтуванні або вимкненні згладжування екземпляр очищається.

Для повернення нагору використовуй `scrollToTop` із `src/lib/scroll.ts`.

## Розміщення на хостингу

Для `createBrowserRouter` сервер має повертати `index.html` для адрес сторінок, які не відповідають наявним файлам. Це дозволить відкривати `/about` і `/contact` напряму та оновлювати їх. Сервер Vite вже підтримує таку поведінку.

Наприклад, для Nginx:

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```
