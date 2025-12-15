import React, { useState, useCallback, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Play, RotateCcw, CheckCircle, XCircle, Copy, Eye, EyeOff } from 'lucide-react';
import { cn } from "@/lib/utils";

export default function CodeEditor({ 
  initialCode = '', 
  solution = '',
  onRun,
  onValidate,
  tests = [],
  language = 'jsx',
  height = '300px',
  readOnly = false
}) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [testResults, setTestResults] = useState([]);
  const [showSolution, setShowSolution] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setCode(initialCode);
    setOutput('');
    setError('');
    setTestResults([]);
  }, [initialCode]);

  const handleRun = useCallback(() => {
    setIsRunning(true);
    setError('');
    setOutput('');

    try {
      // Simulate code execution
      const logs = [];
      const originalLog = console.log;
      console.log = (...args) => {
        logs.push(args.join(' '));
      };

      // Basic validation
      if (!code.trim()) {
        throw new Error('Le code est vide');
      }

      // Check for common syntax issues
      const balancedBrackets = (str) => {
        const stack = [];
        const pairs = { '(': ')', '{': '}', '[': ']' };
        for (const char of str) {
          if (pairs[char]) {
            stack.push(pairs[char]);
          } else if (Object.values(pairs).includes(char)) {
            if (stack.pop() !== char) return false;
          }
        }
        return stack.length === 0;
      };

      if (!balancedBrackets(code)) {
        throw new Error('Parenthèses ou accolades non équilibrées');
      }

      // Simple test validation
      const results = tests.map(test => {
        let passed = false;
        
        switch (test.check) {
          case 'returns_element':
            passed = code.includes('return') && (code.includes('<') || code.includes('null'));
            break;
          case 'contains_h1':
            passed = code.includes('<h1') || code.includes('h1>');
            break;
          case 'displays_name':
          case 'displays_name_prop':
            passed = code.includes('{') && (code.includes('nom') || code.includes('name'));
            break;
          case 'returns_div':
            passed = code.includes('<div');
            break;
          case 'has_class_card':
            passed = code.includes('className') && code.includes('card');
            break;
          case 'has_h2_and_p':
            passed = code.includes('<h2') && code.includes('<p');
            break;
          case 'displays_email_prop':
            passed = code.includes('email');
            break;
          case 'displays_count':
            passed = code.includes('count') || code.includes('Compteur');
            break;
          case 'increment_works':
            passed = code.includes('setCount') && (code.includes('+ 1') || code.includes('+1') || code.includes('c + 1'));
            break;
          case 'decrement_works':
            passed = code.includes('setCount') && (code.includes('- 1') || code.includes('-1') || code.includes('c - 1'));
            break;
          case 'uses_map':
            passed = code.includes('.map(');
            break;
          case 'has_keys':
            passed = code.includes('key=') || code.includes('key ');
            break;
          case 'displays_all':
            passed = code.includes('.map(') && code.includes('key');
            break;
          case 'displays_seconds':
            passed = code.includes('seconds');
            break;
          case 'uses_interval':
            passed = code.includes('setInterval');
            break;
          case 'has_cleanup':
            passed = code.includes('clearInterval') || code.includes('return ()');
            break;
          case 'has_three_fields':
            passed = code.includes('name') && code.includes('email') && code.includes('message');
            break;
          case 'handles_change':
            passed = code.includes('onChange');
            break;
          case 'handles_submit':
            passed = code.includes('onSubmit') || code.includes('handleSubmit');
            break;
          case 'handles_loading':
            passed = code.includes('loading') || code.includes('Loading') || code.includes('Chargement');
            break;
          case 'handles_error':
            passed = code.includes('error') || code.includes('Error') || code.includes('Erreur');
            break;
          case 'displays_posts':
            passed = code.includes('.map(') && (code.includes('post') || code.includes('item'));
            break;
          case 'uses_useref':
            passed = code.includes('useRef');
            break;
          case 'focuses_on_mount':
            passed = code.includes('.focus()') && code.includes('useEffect');
            break;
          case 'has_context':
            passed = code.includes('createContext') || code.includes('Context');
            break;
          case 'has_provider':
            passed = code.includes('Provider') && code.includes('value');
            break;
          case 'has_hook':
            passed = code.includes('useAuth') || code.includes('useContext');
            break;
          case 'returns_array':
            passed = code.includes('return [') || code.includes('return[');
            break;
          case 'toggle_works':
            passed = code.includes('!') || code.includes('=> !');
            break;
          default:
            passed = true;
        }
        
        return { ...test, passed };
      });

      setTestResults(results);
      
      const allPassed = results.every(r => r.passed);
      if (allPassed && results.length > 0) {
        setOutput('✅ Tous les tests sont passés !');
        if (onValidate) onValidate(true);
      } else if (results.length > 0) {
        const failedCount = results.filter(r => !r.passed).length;
        setOutput(`⚠️ ${failedCount} test(s) échoué(s)`);
      } else {
        setOutput('Code exécuté avec succès');
      }

      console.log = originalLog;
      if (logs.length > 0) {
        setOutput(prev => prev + '\n\nConsole:\n' + logs.join('\n'));
      }

    } catch (err) {
      setError(err.message);
      setTestResults([]);
    } finally {
      setIsRunning(false);
    }
  }, [code, tests, onValidate]);

  const handleReset = () => {
    setCode(initialCode);
    setOutput('');
    setError('');
    setTestResults([]);
    setShowSolution(false);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const lineNumbers = code.split('\n').map((_, i) => i + 1);

  return (
    <div className="rounded-xl overflow-hidden border border-slate-200 bg-white shadow-lg">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <span className="text-sm font-medium text-slate-600 ml-3">{language.toUpperCase()}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={copyCode}
            className="text-slate-500 hover:text-slate-700"
          >
            <Copy className="w-4 h-4" />
          </Button>
          {solution && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSolution(!showSolution)}
              className="text-slate-500 hover:text-slate-700"
            >
              {showSolution ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
              {showSolution ? 'Cacher' : 'Solution'}
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-slate-500 hover:text-slate-700"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            onClick={handleRun}
            disabled={isRunning}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            <Play className="w-4 h-4 mr-1" />
            Exécuter
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="relative" style={{ height }}>
        <div className="absolute inset-0 flex">
          {/* Line numbers */}
          <div className="w-12 bg-slate-900 text-slate-500 text-right pr-3 py-4 text-sm font-mono select-none overflow-hidden">
            {lineNumbers.map(num => (
              <div key={num} className="leading-6">{num}</div>
            ))}
          </div>
          {/* Code area */}
          <textarea
            value={showSolution ? solution : code}
            onChange={(e) => !showSolution && setCode(e.target.value)}
            readOnly={readOnly || showSolution}
            className={cn(
              "flex-1 bg-slate-900 text-slate-100 p-4 font-mono text-sm resize-none outline-none",
              "leading-6 overflow-auto",
              showSolution && "bg-slate-800"
            )}
            style={{ tabSize: 2 }}
            spellCheck={false}
          />
        </div>
      </div>

      {/* Test Results */}
      {testResults.length > 0 && (
        <div className="border-t border-slate-200 p-4 bg-slate-50">
          <h4 className="text-sm font-semibold text-slate-700 mb-2">Tests</h4>
          <div className="space-y-1">
            {testResults.map((test, index) => (
              <div 
                key={index}
                className={cn(
                  "flex items-center gap-2 text-sm py-1 px-2 rounded",
                  test.passed ? "text-emerald-700 bg-emerald-50" : "text-red-700 bg-red-50"
                )}
              >
                {test.passed ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <XCircle className="w-4 h-4" />
                )}
                {test.description}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Output */}
      {(output || error) && (
        <div className={cn(
          "border-t p-4 font-mono text-sm",
          error ? "bg-red-50 text-red-700 border-red-200" : "bg-slate-50 text-slate-700"
        )}>
          <pre className="whitespace-pre-wrap">
            {error || output}
          </pre>
        </div>
      )}
    </div>
  );
}
