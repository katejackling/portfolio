export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-nextjs-landing-pages'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5d4075a9072bba017ccd4f0a',
                  title: 'Sanity Studio',
                  name: 'kate-jackling-studio',
                  apiId: '316909e9-4c76-45f1-a4ea-c8c9dcb1a146'
                },
                {
                  buildHookId: '5d4075a9ea7e850187513717',
                  title: 'Landing pages Website',
                  name: 'kate-jackling-web',
                  apiId: '64cea381-98fc-4bf3-8233-3c9ad58820a4'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/philipppolder/kate-jackling',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://kate-jackling-web.netlify.com', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recently edited', order: '_updatedAt desc', limit: 10, types: ['page']},
      layout: {width: 'medium'}
    }
  ]
}
