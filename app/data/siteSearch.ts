import { surahSearchItems } from './surahSearch'
import { hadiths } from './hadiths'
import { articleGuides } from './articleGuides'
import type { SearchItem } from '../utils/siteSearch'

export const siteSearchIndex: SearchItem[] = [
  ...surahSearchItems,
  ...hadiths.map(hadith => ({
    title: hadith.title,
    description: `${hadith.topic} · ${hadith.reference}`,
    to: `/hadis?hadis=${hadith.id}`,
    kind: 'Hadis',
    keywords: [hadith.title, hadith.text, hadith.arabic, hadith.meaning, hadith.narrator, hadith.topic, hadith.reference],
    priority: 90
  })),
  ...Object.entries(articleGuides).flatMap(([slug, article]) => [
    {
      title: article.title, description: article.description, to: `/articles/${slug}`, kind: 'Makale',
      keywords: [article.title, article.category, ...article.faqs.flatMap(faq => [faq.question, faq.answer])], priority: 80
    },
    ...article.sections.map(section => ({
      title: section.title,
      description: article.title,
      to: `/articles/${slug}#${section.id}`,
      kind: 'Bölüm',
      keywords: [
        ...section.paragraphs,
        section.callout?.title ?? '', section.callout?.body ?? '',
        section.steps?.title ?? '', section.steps?.description ?? '',
        ...(section.steps?.items.flatMap(step => [
          step.title, step.body, step.detail ?? '', step.attention ?? '',
          ...(step.recitations?.flatMap(recitation => [recitation.title ?? '', recitation.arabic, recitation.latin ?? '', recitation.meaning]) ?? [])
        ]) ?? [])
      ],
      priority: 70
    }))
  ])
]
