export const projects = [
    {
        id: 'btc-village',
        slug: 'btc-village',
        title: 'BTC Village',
        excerpt: 'Support network platform with Vue + Django + Postgres. Made to connect the local community to help support the children. Can manage members, events with invites for everyone, and role-based views. GitHub is now down since BTC is incorporating it into their platform.',
        image: '/images/House.svg',
        github: 'https://github.com/BC7/Village-Stakeholder',
        tags: ['Web App', 'Full Stack'],
        tech: ['Vue', 'Django', 'PostgreSQL', 'Docker'],
    },
    {
        id: 'cuda-bfs',
        slug: 'cuda-bfs',
        title: 'GPU Bi-BFS',
        excerpt: 'CUPA + MPI bi-directional BFS implementation with performance notes. Goes over the different versions and the thought process behind it.',
        image: '/images/cuda-bfs.png',
        github: 'https://github.com/Tomaszbrauntsch/Bidirectional-BFS',
        tags: ['GPU', 'Algorithms'],
        tech: ['CUDA', 'MPI', 'C++']
    },
    {
        id: 'compiler',
        slug: 'cool-compiler',
        title: 'COOL Compiler',
        excerpt: 'The COOL (Classroom Object Oriented Language) Compiler is a compiler for a Java-like language that can compile to x86-64. This goes over a small piece of the implementation and what I covered in the code.',
        image: '/images/Compiler_vs_Interpreter.svg',
        github: 'https://github.com/Hamdi-korreshi/CS488_compilers',
        tags: ['Low-level', 'x86-64'],
        tech: ['Ocaml', 'Bash', ]
    },
    {
        id: 'youtube-algo',
        slug: "youtube-algo",
        title: "YouTube-like Algorithm",
        excerpt: 'A showing of how to use a NN and encoding model to create a YouTube similarity search algorithm. Type in words and get videos that are similar to that word.',
        image: '/images/similarity.jpg',
        github: 'https://github.com/Hamdi-korreshi/CS482_proj',
        tags: [ 'AI', ],
        tech: ['Pytorch', 'PostgreSQL', 'Docker']
    },
    {
        id: 'geo-split',
        slug: 'geo-split',
        title: 'Geo Splitting Model',
        excerpt: 'A model that uses the Geo spatial splitting model from Meta and trained it to detect roads. Demo is included in the GitHub link.',
        image: '/images/highway.webp',
        github: 'https://github.com/saumyad03/segment-anything-project',
        tags: ['AI', 'Patchify', 'Pytorch', 'Flask'],
        tech: ['PyTorch', 'Google Colab', 'Flask']
    },
    {
        id: 'codecraft',
        slug: 'codecraft',
        title: 'CodeCraft',
        excerpt: 'This is one of my capstone projects where I led my team to complete a Web App that allows translation of coding languages between C++, C, Java, and Python.',
        image: '/images/logo3.webp',
        tags: ['Web App', 'Full Stack', 'React', 'Flask', 'MySQL'],
        github: 'https://github.com/TheGoofy-Goobers/CS490_project'
    }
]