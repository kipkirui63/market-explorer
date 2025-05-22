import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  email: z.string().email({ message: 'Please enter a valid email' }),
  taskAutomation: z.boolean().optional(),
  personalization: z.boolean().optional(),
  decisionMaking: z.boolean().optional(),
  operations: z.boolean().optional(),
  productivity: z.boolean().optional(),
  other: z.boolean().optional(),
  additionalInfo: z.string().optional()
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      taskAutomation: false,
      personalization: false,
      decisionMaking: false,
      operations: false,
      productivity: false,
      other: false,
      additionalInfo: ''
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Create FormData to send to Google Sheets script
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      
      const useCases = [
        data.taskAutomation ? 'Automating repetitive tasks' : '',
        data.personalization ? 'Personalizing customer experiences' : '',
        data.decisionMaking ? 'Enhancing decision-making with data' : '',
        data.operations ? 'Streamlining operations' : '',
        data.productivity ? 'Improving productivity' : '',
        data.other ? 'Other' : ''
      ].filter(Boolean).join(', ');
      
      formData.append('useCases', useCases);
      formData.append('additionalInfo', data.additionalInfo || '');
      
      // Use the same script URL that's used in the assessment component
      const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby2zmVSxxEYrm_9dUoVuZxhMYSon2wEiiRx_xtW5m6nfjqSXSruv4iBUkSH_m1C1mGW0w/exec';

      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast({
          title: 'Form submitted successfully',
          description: 'We will get back to you within 24 hours.',
          variant: 'default',
        });
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      toast({
        title: 'Form submission failed',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-10 border border-blue-100">
      <h3 className="text-2xl font-bold mb-6 text-blue-800">Let's Unlock Your Business Potential with AI!</h3>
      <p className="text-blue-600 mb-8 text-lg">
        Tell us about your business, your goals, and where AI can help make magic happen. 
        The more we know, the better we can tailor our solutions just for you. 
        Don't hold back—this is your space to shine.
      </p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-blue-700 text-lg">Email <span className="text-red-500">*</span></FormLabel>
                <div className="flex items-center">
                  <div className="flex-1 flex items-center border border-blue-200 rounded-md px-4 py-3 text-blue-600 bg-blue-50 text-lg">
                    {field.value || "youremail@example.com"}
                    <a href="#" className="ml-auto text-blue-500 text-md font-medium" onClick={(e) => {
                      e.preventDefault();
                      // This would normally integrate with a login system
                      const newEmail = prompt("Enter your email address:");
                      if (newEmail) field.onChange(newEmail);
                    }}>
                      Switch account
                    </a>
                  </div>
                </div>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-blue-700 text-lg">What's your Name? <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="Your answer" {...field} className="border-blue-200 focus:border-blue-400 py-6 text-lg" />
                </FormControl>
              </FormItem>
            )}
          />
          
          <div className="space-y-4 mt-4">
            <p className="block text-lg font-medium text-blue-700">
              What's the biggest challenge or dream you'd love AI to tackle? Are there specific use cases you're curious about?
            </p>
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="taskAutomation"
                render={({ field }) => (
                  <FormItem className="flex items-start space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox 
                        checked={field.value} 
                        onCheckedChange={field.onChange}
                        className="h-5 w-5" 
                      />
                    </FormControl>
                    <FormLabel className="font-normal text-blue-600 text-lg">Automating repetitive tasks</FormLabel>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="personalization"
                render={({ field }) => (
                  <FormItem className="flex items-start space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox 
                        checked={field.value} 
                        onCheckedChange={field.onChange}
                        className="h-5 w-5" 
                      />
                    </FormControl>
                    <FormLabel className="font-normal text-blue-600 text-lg">Personalizing customer experiences</FormLabel>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="decisionMaking"
                render={({ field }) => (
                  <FormItem className="flex items-start space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox 
                        checked={field.value} 
                        onCheckedChange={field.onChange}
                        className="h-5 w-5" 
                      />
                    </FormControl>
                    <FormLabel className="font-normal text-blue-600 text-lg">Enhancing decision-making with data</FormLabel>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="operations"
                render={({ field }) => (
                  <FormItem className="flex items-start space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox 
                        checked={field.value} 
                        onCheckedChange={field.onChange}
                        className="h-5 w-5" 
                      />
                    </FormControl>
                    <FormLabel className="font-normal text-blue-600 text-lg">Streamlining operations</FormLabel>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="productivity"
                render={({ field }) => (
                  <FormItem className="flex items-start space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox 
                        checked={field.value} 
                        onCheckedChange={field.onChange}
                        className="h-5 w-5" 
                      />
                    </FormControl>
                    <FormLabel className="font-normal text-blue-600 text-lg">Improving productivity</FormLabel>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="other"
                render={({ field }) => (
                  <FormItem className="flex items-start space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox 
                        checked={field.value} 
                        onCheckedChange={field.onChange}
                        className="h-5 w-5" 
                      />
                    </FormControl>
                    <FormLabel className="font-normal text-blue-600 text-lg">Other</FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <FormField
            control={form.control}
            name="additionalInfo"
            render={({ field }) => (
              <FormItem className="space-y-3 mt-4">
                <FormLabel className="text-blue-700 text-lg">Anything else you want to share?</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Your answer" 
                    rows={4} 
                    {...field} 
                    className="border-blue-200 focus:border-blue-400 text-lg p-4"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <div className="flex justify-between items-center pt-6">
            <Button 
              type="submit" 
              className="px-8 py-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition shadow-md text-lg font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
            <Button 
              type="reset" 
              variant="ghost" 
              onClick={() => form.reset()} 
              className="px-6 py-3 text-blue-600 hover:text-blue-800 hover:underline transition text-lg"
            >
              Clear form
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
