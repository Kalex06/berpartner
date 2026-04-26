using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using static System.Net.Mime.MediaTypeNames;

namespace berpartner_admin
{
    /// <summary>
    /// Interaction logic for TablesPage.xaml
    /// </summary>
    public partial class TablesPage : Page
    {
        public TablesPage()
        {
            InitializeComponent();
        }

        class MainCategory {
        
        
            public int id { get; set; }
            public string fo_kategoria { get; set; }
        
        }

        class SubCategory
        {


            public int id { get; set; }
            public string kategoria { get; set; }

        }

        private static readonly HttpClient client = new HttpClient();


        ObservableCollection<MainCategory> mainCategories = new ObservableCollection<MainCategory>();
        ObservableCollection<SubCategory> categories = new ObservableCollection<SubCategory>();
        private async void Grid_Loaded(object sender, RoutedEventArgs e)
        {

            try
            {

                client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", App.Token);

                HttpResponseMessage respons = await client.GetAsync("http://localhost:3000/category/main/all");

                if (respons.IsSuccessStatusCode)
                {

                    mainCategories = await respons.Content.ReadFromJsonAsync<ObservableCollection<MainCategory>>();

                   
                     ListBoxmainCategories.ItemsSource = mainCategories;



                }
                else
                {

                    if (respons.StatusCode == System.Net.HttpStatusCode.Forbidden)
                    {

                        MessageBox.Show("Nincs jogosultságod ehhez!", "Hiányzó jogosultság", MessageBoxButton.OK, MessageBoxImage.Error);
                        MainWindow main = new MainWindow();
                        main.Show();
                        HomeWindow home = new HomeWindow();
                        home.Close();



                    }
                    else
                    {

                        MessageBox.Show(respons.StatusCode.ToString(), "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);

                    }



                }

            }
            catch (HttpRequestException)
            {
                MessageBox.Show("Nem sikerült elérni a szervert!", "Hálózati hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
            catch (Exception ex)
            {

                MessageBox.Show(ex.ToString(), "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void Cancel_Click(object sender, RoutedEventArgs e)
        {
            var gomb = (Button)sender;

            var editPanel = (StackPanel)gomb.Tag;
            var sorGrid = (Grid)editPanel.Parent;

            var normalPanel = (StackPanel)sorGrid.FindName("NormalMode");
            var text = (TextBlock)sorGrid.FindName("TextDisplay");
            var textedit = (TextBox)sorGrid.FindName("TextEdit");


            normalPanel.Visibility = Visibility.Visible;
            editPanel.Visibility = Visibility.Collapsed;
            text.Visibility = Visibility.Visible;
            textedit.Visibility = Visibility.Collapsed;


        }

        private async void Save_Click_mainCategory(object sender, RoutedEventArgs e)
        {

            var gomb = (Button)sender;
            var mainCategory = (MainCategory)gomb.DataContext;

            var editPanel = (StackPanel)gomb.Tag;
            var sorGrid = (Grid)editPanel.Parent;

            var normalPanel = (StackPanel)sorGrid.FindName("NormalMode");
            var text = (TextBlock)sorGrid.FindName("TextDisplay");
            var textedit = (TextBox)sorGrid.FindName("TextEdit");

            if (MessageBox.Show($"Biztos módosítani akarja ezt?\n\n\t{mainCategory.fo_kategoria}","Megerősítés",MessageBoxButton.YesNo,MessageBoxImage.Warning) == MessageBoxResult.No) {
                return;
            }

            if (textedit.Text.Trim() != "")
            {

                BindingExpression binding = textedit.GetBindingExpression(TextBox.TextProperty);
                binding.UpdateSource();

                try
                {

                    client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", App.Token);

                    HttpResponseMessage respons = await client.PatchAsJsonAsync($"http://localhost:3000/category/main/update",mainCategory);

                    if (respons.IsSuccessStatusCode)
                    {
                        Grid_Loaded(null, null);
                        MessageBox.Show("Sikeres Frissítés!","Értesítés",MessageBoxButton.OK,MessageBoxImage.Information);
                        

                    }
                    else
                    {

                        if (respons.StatusCode == System.Net.HttpStatusCode.Forbidden)
                        {

                            MessageBox.Show("Nincs jogosultságod ehhez!", "Hiányzó jogosultság", MessageBoxButton.OK, MessageBoxImage.Error);
                            MainWindow main = new MainWindow();
                            main.Show();
                            HomeWindow home = new HomeWindow();
                            home.Close();



                        }
                        else
                        {

                            MessageBox.Show(respons.StatusCode.ToString(), "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);

                        }



                    }

                }
                catch (HttpRequestException)
                {
                    MessageBox.Show("Nem sikerült elérni a szervert!", "Hálózati hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                }
                catch (Exception ex)
                {

                    MessageBox.Show(ex.ToString(), "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                }


            }

            else {

                MessageBox.Show("Nem lehet üres karakterlánc!","Hiba",MessageBoxButton.OK,MessageBoxImage.Error);
            }

            normalPanel.Visibility = Visibility.Visible;
            editPanel.Visibility = Visibility.Collapsed;
            text.Visibility = Visibility.Visible;
            textedit.Visibility = Visibility.Collapsed;

        }

        private async void Delete_Click_mainCategory(object sender, RoutedEventArgs e)
        {
            var gomb = (Button)sender;
            var mainCategory = (MainCategory)gomb.DataContext;

            if (MessageBox.Show($"FIGYELEM!\nHa törli ezt a főkategóriát akkor az összes kategória ezen a kategórián belül és az összes ezekben a kategóriákban meghirdetett eszköz és a hozzá kapcsolódó adatok törlésre kerül!\nBiztos törölni akarja ezt?\n\n\t{mainCategory.fo_kategoria}", "Megerősítés", MessageBoxButton.YesNo, MessageBoxImage.Warning) == MessageBoxResult.No)
            {
                return;
            }

            try
            {
                client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", App.Token);

                HttpResponseMessage respons = await client.DeleteAsync($"http://localhost:3000/category/main/delete/{mainCategory.id}");

                if (respons.IsSuccessStatusCode)
                {
                    Grid_Loaded(null, null);
                    MessageBox.Show("Sikeres Törlés!", "Értesítés", MessageBoxButton.OK, MessageBoxImage.Information);
                }
                else
                {

                    if (respons.StatusCode == System.Net.HttpStatusCode.Forbidden)
                    {
                        MessageBox.Show("Nincs jogosultságod ehhez!", "Hiányzó jogosultság", MessageBoxButton.OK, MessageBoxImage.Error);
                        MainWindow main = new MainWindow();
                        main.Show();
                        HomeWindow home = new HomeWindow();
                        home.Close();
                    }
                    else
                    {

                        MessageBox.Show(respons.StatusCode.ToString(), "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                    }
                }
            }
            catch (HttpRequestException)
            {
                MessageBox.Show("Nem sikerült elérni a szervert!", "Hálózati hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.ToString(), "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }

        }

        private void Edit_Click(object sender, RoutedEventArgs e)
        {
            var gomb = (Button)sender;

            var normalPanel = (StackPanel)gomb.Tag;
            var sorGrid = (Grid)normalPanel.Parent;
            var editPanel = (StackPanel)sorGrid.FindName("EditMode");
            var text = (TextBlock)sorGrid.FindName("TextDisplay");
            var textedit = (TextBox)sorGrid.FindName("TextEdit");

            normalPanel.Visibility = Visibility.Collapsed;
            editPanel.Visibility = Visibility.Visible;
            text.Visibility = Visibility.Collapsed;
            textedit.Visibility = Visibility.Visible;

            textedit.Focus();
            textedit.SelectAll();
            


        }

        private async void ListBoxmainCategories_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            try
            {
                client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", App.Token);

                HttpResponseMessage respons = await client.GetAsync($"http://localhost:3000/category/sub/{ListBoxmainCategories.SelectedValue}");

                if (respons.IsSuccessStatusCode)
                {

                    categories = await respons.Content.ReadFromJsonAsync<ObservableCollection<SubCategory>>();

                    ListBoxsubCategories.ItemsSource = categories;
                }
                else
                {

                    if (respons.StatusCode == System.Net.HttpStatusCode.Forbidden)
                    {
                        MessageBox.Show("Nincs jogosultságod ehhez!", "Hiányzó jogosultság", MessageBoxButton.OK, MessageBoxImage.Error);
                        MainWindow main = new MainWindow();
                        main.Show();
                        HomeWindow home = new HomeWindow();
                        home.Close();
                    }
                    else
                    {

                        MessageBox.Show(respons.StatusCode.ToString(), "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                    }
                }
            }
            catch (HttpRequestException)
            {
                MessageBox.Show("Nem sikerült elérni a szervert!", "Hálózati hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.ToString(), "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private async void Save_Click_category(object sender, RoutedEventArgs e)
        {
            var gomb = (Button)sender;
            var category = (SubCategory)gomb.DataContext;

            var editPanel = (StackPanel)gomb.Tag;
            var sorGrid = (Grid)editPanel.Parent;

            var normalPanel = (StackPanel)sorGrid.FindName("NormalMode");
            var text = (TextBlock)sorGrid.FindName("TextDisplay");
            var textedit = (TextBox)sorGrid.FindName("TextEdit");

            if (MessageBox.Show($"Biztos módosítani akarja ezt?\n\n\t{category.kategoria}", "Megerősítés", MessageBoxButton.YesNo, MessageBoxImage.Warning) == MessageBoxResult.No)
            {
                return;
            }

            if (textedit.Text.Trim() != "")
            {

                BindingExpression binding = textedit.GetBindingExpression(TextBox.TextProperty);
                binding.UpdateSource();

                try
                {

                    client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", App.Token);

                    HttpResponseMessage respons = await client.PatchAsJsonAsync($"http://localhost:3000/category/sub/update", category);

                    if (respons.IsSuccessStatusCode)
                    {
                        ListBoxmainCategories_SelectionChanged(null, null);
                        MessageBox.Show("Sikeres Frissítés!", "Értesítés", MessageBoxButton.OK, MessageBoxImage.Information);


                    }
                    else
                    {

                        if (respons.StatusCode == System.Net.HttpStatusCode.Forbidden)
                        {

                            MessageBox.Show("Nincs jogosultságod ehhez!", "Hiányzó jogosultság", MessageBoxButton.OK, MessageBoxImage.Error);
                            MainWindow main = new MainWindow();
                            main.Show();
                            HomeWindow home = new HomeWindow();
                            home.Close();

                        }
                        else
                        {

                            MessageBox.Show(respons.StatusCode.ToString(), "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);

                        }

                    }

                }
                catch (HttpRequestException)
                {
                    MessageBox.Show("Nem sikerült elérni a szervert!", "Hálózati hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                }
                catch (Exception ex)
                {

                    MessageBox.Show(ex.ToString(), "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                }

            }

            else
            {

                MessageBox.Show("Nem lehet üres karakterlánc!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }

            normalPanel.Visibility = Visibility.Visible;
            editPanel.Visibility = Visibility.Collapsed;
            text.Visibility = Visibility.Visible;
            textedit.Visibility = Visibility.Collapsed;
        }

        private async void Delete_Click_category(object sender, RoutedEventArgs e)
        {
            var gomb = (Button)sender;
            var category = (SubCategory)gomb.DataContext;

            if (MessageBox.Show($"FIGYELEM!\nHa törli ezt a kategóriát akkor az összes ebben a kategóriában meghirdetett eszköz és a hozzá kapcsolódó adatok törlésre kerül!\nBiztos törölni akarja ezt?\n\n\t{category.kategoria}", "Megerősítés", MessageBoxButton.YesNo, MessageBoxImage.Warning) == MessageBoxResult.No)
            {
                return;
            }

            try
            {
                client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", App.Token);

                HttpResponseMessage respons = await client.DeleteAsync($"http://localhost:3000/category/sub/delete/{category.id}");

                if (respons.IsSuccessStatusCode)
                {
                    ListBoxmainCategories_SelectionChanged(null, null);
                    MessageBox.Show("Sikeres Törlés!", "Értesítés", MessageBoxButton.OK, MessageBoxImage.Information);
                }
                else
                {

                    if (respons.StatusCode == System.Net.HttpStatusCode.Forbidden)
                    {
                        MessageBox.Show("Nincs jogosultságod ehhez!", "Hiányzó jogosultság", MessageBoxButton.OK, MessageBoxImage.Error);
                        MainWindow main = new MainWindow();
                        main.Show();
                        HomeWindow home = new HomeWindow();
                        home.Close();
                    }
                    else
                    {

                        MessageBox.Show(respons.StatusCode.ToString(), "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                    }
                }
            }
            catch (HttpRequestException)
            {
                MessageBox.Show("Nem sikerült elérni a szervert!", "Hálózati hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.ToString(), "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }

        }

        private  void Add_Click_mainCategory(object sender, RoutedEventArgs e)
        {
            int id = 0;
            if (ListBoxmainCategories.Items.Count > 0) {

                var lastdata = ListBoxmainCategories.Items[ListBoxmainCategories.Items.Count - 1] as MainCategory;

                id = lastdata.id+1;
            }
            MainCategory new_MainCategory = new MainCategory { id = id, fo_kategoria = "" };

            mainCategories.Add(new_MainCategory);

            Dispatcher.BeginInvoke(System.Windows.Threading.DispatcherPriority.Background, new Action(() =>
            {
                int utolsoIndex = ListBoxmainCategories.Items.Count - 1;
                var utolsoSor = ListBoxmainCategories.ItemContainerGenerator.ContainerFromIndex(utolsoIndex) as ListBoxItem;

                    ContentPresenter cp = null;
                    for (int i = 0; i < VisualTreeHelper.GetChildrenCount(utolsoSor); i++)
                    {
                        var child = VisualTreeHelper.GetChild(utolsoSor, i);
                        if (child is Border b) child = b.Child;
                        if (child is ContentPresenter presenter) { cp = presenter; break; }
                    }

                if (cp != null)
                {
                    DataTemplate dt = cp.ContentTemplate;

                    Button btnEdit = dt.FindName("btnEdit", cp) as Button;
                    Button btnCancel = dt.FindName("btnCancel", cp) as Button;
                    StackPanel normalPanel = dt.FindName("NormalMode", cp) as StackPanel;
                    StackPanel editPanel = dt.FindName("EditMode", cp) as StackPanel;
                    TextBox textedit = dt.FindName("TextEdit", cp) as TextBox;
                    TextBlock textDisplay = dt.FindName("TextDisplay", cp) as TextBlock;
                    
                    btnEdit.Click -= Save_Click_mainCategory;
                    btnEdit.Click += upload_Click_Maincategory;

                    btnCancel.Click -= Cancel_Click;
                    btnCancel.Click += remove_Click_MainCategory;

                    if (normalPanel != null){                    
                        normalPanel.Visibility = Visibility.Collapsed;
                    }

                    if (editPanel != null){                      
                        editPanel.Visibility = Visibility.Visible;
                    }

                    if (textDisplay != null) {                    
                        textDisplay.Visibility = Visibility.Collapsed;
                    }

                    if (textedit != null)
                    {
                        textedit.Visibility = Visibility.Visible;
                        textedit.Focus();
                        textedit.SelectAll();
                    }
                }
                
            }));
        }

        private void Add_Click_category(object sender, RoutedEventArgs e)
        {
            int id = 0;
            if (ListBoxsubCategories.Items.Count > 0)
            {

                var lastdata = ListBoxsubCategories.Items[ListBoxsubCategories.Items.Count - 1] as SubCategory;

                id = lastdata.id + 1;
            }
            SubCategory new_category = new SubCategory { id = id, kategoria = "" };

             categories.Add(new_category);

            Dispatcher.BeginInvoke(System.Windows.Threading.DispatcherPriority.Background, new Action(() =>
            {
                int utolsoIndex = ListBoxsubCategories.Items.Count - 1;
                var utolsoSor = ListBoxsubCategories.ItemContainerGenerator.ContainerFromIndex(utolsoIndex) as ListBoxItem;

                ContentPresenter cp = null;
                for (int i = 0; i < VisualTreeHelper.GetChildrenCount(utolsoSor); i++)
                {
                    var child = VisualTreeHelper.GetChild(utolsoSor, i);
                    if (child is Border b) child = b.Child;
                    if (child is ContentPresenter presenter) { cp = presenter; break; }
                }

                if (cp != null)
                {
                    DataTemplate dt = cp.ContentTemplate;


                    Button btnEdit = dt.FindName("btnEdit", cp) as Button;
                    Button btnCancel = dt.FindName("btnCancel", cp) as Button;
                    StackPanel normalPanel = dt.FindName("NormalMode", cp) as StackPanel;
                    StackPanel editPanel = dt.FindName("EditMode", cp) as StackPanel;
                    TextBox textedit = dt.FindName("TextEdit", cp) as TextBox;
                    TextBlock textDisplay = dt.FindName("TextDisplay", cp) as TextBlock;



                    btnEdit.Click -= Save_Click_category;
                    btnEdit.Click += upload_Click_category;

                    btnCancel.Click -= Cancel_Click;
                    btnCancel.Click += remove_Click_category;

                    if (normalPanel != null)
                    {
                        normalPanel.Visibility = Visibility.Collapsed;
                    }

                    if (editPanel != null)
                    {
                        editPanel.Visibility = Visibility.Visible;
                    }

                    if (textDisplay != null)
                    {
                        textDisplay.Visibility = Visibility.Collapsed;
                    }

                    if (textedit != null)
                    {
                        textedit.Visibility = Visibility.Visible;
                        textedit.Focus();
                        textedit.SelectAll();
                    }
                }

            }));

        }

        private async void upload_Click_Maincategory(object sender, RoutedEventArgs e)
        {
            var gomb = (Button)sender;
            var mainCategory = (MainCategory)gomb.DataContext;

            var editPanel = (StackPanel)gomb.Tag;
            var sorGrid = (Grid)editPanel.Parent;

            var normalPanel = (StackPanel)sorGrid.FindName("NormalMode");
            var text = (TextBlock)sorGrid.FindName("TextDisplay");
            var textedit = (TextBox)sorGrid.FindName("TextEdit");


            if (textedit.Text.Trim() != "")
            {

                BindingExpression binding = textedit.GetBindingExpression(TextBox.TextProperty);
                binding.UpdateSource();

                try
                {

                    client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", App.Token);

                    HttpResponseMessage respons = await client.PostAsJsonAsync($"http://localhost:3000/category/main/post", mainCategory);

                    if (respons.IsSuccessStatusCode)
                    {
                        Grid_Loaded(null, null);

                        gomb.Click -= upload_Click_Maincategory;
                        gomb.Click += Save_Click_mainCategory;
                        MessageBox.Show("Új rekord létrehozva!", "Értesítés", MessageBoxButton.OK, MessageBoxImage.Information);


                    }
                    else
                    {

                        if (respons.StatusCode == System.Net.HttpStatusCode.Forbidden)
                        {

                            MessageBox.Show("Nincs jogosultságod ehhez!", "Hiányzó jogosultság", MessageBoxButton.OK, MessageBoxImage.Error);
                            MainWindow main = new MainWindow();
                            main.Show();
                            HomeWindow home = new HomeWindow();
                            home.Close();



                        }
                        else
                        {

                            MessageBox.Show(respons.StatusCode.ToString(), "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);

                        }



                    }

                }
                catch (HttpRequestException)
                {
                    MessageBox.Show("Nem sikerült elérni a szervert!", "Hálózati hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                }
                catch (Exception ex)
                {

                    MessageBox.Show(ex.ToString(), "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                }


            }

            else
            {

                MessageBox.Show("Nem lehet üres karakterlánc!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }

            normalPanel.Visibility = Visibility.Visible;
            editPanel.Visibility = Visibility.Collapsed;
            text.Visibility = Visibility.Visible;
            textedit.Visibility = Visibility.Collapsed;

        
            }

        private void remove_Click_MainCategory(object sender, RoutedEventArgs e)
        {
            var button = sender as Button;

            var removeItem = button.DataContext as MainCategory;

            mainCategories.Remove(removeItem);

            
        }

        private async void upload_Click_category(object sender, RoutedEventArgs e)
        {

            var gomb = (Button)sender;
            var category = (SubCategory)gomb.DataContext;

            var editPanel = (StackPanel)gomb.Tag;
            var sorGrid = (Grid)editPanel.Parent;

            var normalPanel = (StackPanel)sorGrid.FindName("NormalMode");
            var text = (TextBlock)sorGrid.FindName("TextDisplay");
            var textedit = (TextBox)sorGrid.FindName("TextEdit");


            if (textedit.Text.Trim() != "")
            {

                BindingExpression binding = textedit.GetBindingExpression(TextBox.TextProperty);
                binding.UpdateSource();

                try
                {

                    var new_category = new
                    {
                        fo_kategoriaId = ListBoxmainCategories.SelectedValue,
                        kategoria = category.kategoria
                    };

                    client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", App.Token);

                    HttpResponseMessage respons = await client.PostAsJsonAsync($"http://localhost:3000/category/sub/post", new_category);

                    if (respons.IsSuccessStatusCode)
                    {
                        ListBoxmainCategories_SelectionChanged(null, null);

                        gomb.Click -= upload_Click_category;
                        gomb.Click += Save_Click_category;
                        MessageBox.Show("Új rekord létrehozva!", "Értesítés", MessageBoxButton.OK, MessageBoxImage.Information);


                    }
                    else
                    {

                        if (respons.StatusCode == System.Net.HttpStatusCode.Forbidden)
                        {

                            MessageBox.Show("Nincs jogosultságod ehhez!", "Hiányzó jogosultság", MessageBoxButton.OK, MessageBoxImage.Error);
                            MainWindow main = new MainWindow();
                            main.Show();
                            HomeWindow home = new HomeWindow();
                            home.Close();



                        }
                        else
                        {

                            MessageBox.Show(respons.StatusCode.ToString(), "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);

                        }



                    }

                }
                catch (HttpRequestException)
                {
                    MessageBox.Show("Nem sikerült elérni a szervert!", "Hálózati hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                }
                catch (Exception ex)
                {

                    MessageBox.Show(ex.ToString(), "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                }


            }

            else
            {

                MessageBox.Show("Nem lehet üres karakterlánc!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }

            normalPanel.Visibility = Visibility.Visible;
            editPanel.Visibility = Visibility.Collapsed;
            text.Visibility = Visibility.Visible;
            textedit.Visibility = Visibility.Collapsed;

        }

        private void remove_Click_category(object sender, RoutedEventArgs e)
        {
            var button = sender as Button;

            var removeItem = button.DataContext as SubCategory;

            categories.Remove(removeItem);
        }
    }
}

