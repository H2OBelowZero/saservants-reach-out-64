import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, FileText, Users, Heart, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  path: string;
  type: 'page' | 'program' | 'resource';
  icon: React.ReactNode;
}

const searchData: SearchResult[] = [
  {
    id: '1',
    title: 'About Us',
    description: 'Learn about SSFATPF mission, vision, and impact in fighting teenage pregnancy',
    path: '/about',
    type: 'page',
    icon: <Users className="h-4 w-4" />
  },
  {
    id: '2',
    title: 'Our Programs',
    description: 'Educational workshops, peer support groups, and community outreach programs',
    path: '/programs',
    type: 'program',
    icon: <Heart className="h-4 w-4" />
  },
  {
    id: '3',
    title: 'Educational Resources',
    description: 'Access comprehensive materials on reproductive health and teenage pregnancy prevention',
    path: '/resources',
    type: 'resource',
    icon: <FileText className="h-4 w-4" />
  },
  {
    id: '4',
    title: 'Get Involved',
    description: 'Volunteer opportunities, donations, and ways to support our mission',
    path: '/get-involved',
    type: 'page',
    icon: <Heart className="h-4 w-4" />
  },
  {
    id: '5',
    title: 'Contact Us',
    description: 'Get in touch with our team for support, partnerships, or information',
    path: '/contact',
    type: 'page',
    icon: <Phone className="h-4 w-4" />
  },
  {
    id: '6',
    title: 'Events',
    description: 'View upcoming and past community events and educational workshops',
    path: '/events',
    type: 'page',
    icon: <Users className="h-4 w-4" />
  },
  {
    id: '7',
    title: 'News & Updates',
    description: 'Latest news, articles, and updates from SSFATPF',
    path: '/news',
    type: 'page',
    icon: <FileText className="h-4 w-4" />
  },
  {
    id: '8',
    title: 'Reports & Publications',
    description: 'Annual reports, research findings, and official publications',
    path: '/reports',
    type: 'resource',
    icon: <FileText className="h-4 w-4" />
  }
];

interface SearchDialogProps {
  children: React.ReactNode;
}

const SearchDialog = ({ children }: SearchDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredResults(searchData);
    } else {
      const filtered = searchData.filter(
        item =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredResults(filtered);
    }
  }, [searchTerm]);

  const handleResultClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
    setSearchTerm('');
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'program':
        return 'bg-primary/10 text-primary';
      case 'resource':
        return 'bg-accent/10 text-accent';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Search SSFATPF</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Search for pages, programs, resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
            autoFocus
          />
          <div className="max-h-96 overflow-y-auto space-y-2">
            {filteredResults.length > 0 ? (
              filteredResults.map((result) => (
                <Button
                  key={result.id}
                  variant="ghost"
                  className="w-full h-auto p-4 justify-start"
                  onClick={() => handleResultClick(result.path)}
                >
                  <div className="flex items-start space-x-3 w-full">
                    <div className="flex-shrink-0 mt-1">
                      {result.icon}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium">{result.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(result.type)}`}>
                          {result.type}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{result.description}</p>
                    </div>
                  </div>
                </Button>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No results found for "{searchTerm}"</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;