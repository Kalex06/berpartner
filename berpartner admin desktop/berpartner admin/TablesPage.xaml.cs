using System;
using System.Collections.Generic;
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

        private static readonly HttpClient client = new HttpClient();

        private async void Grid_Loaded(object sender, RoutedEventArgs e)
        {

            try
            {

                client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", App.Token);

                HttpResponseMessage respons = await client.GetAsync("http://localhost:3000/category/main/all");

                if (respons.IsSuccessStatusCode)
                {

                    var result = await respons.Content.ReadFromJsonAsync<List<MainCategory>>();



                   
                     ListBoxmainCategories.ItemsSource = result;



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

        private void Save_Click(object sender, RoutedEventArgs e)
        {

        }

        private void Delete_Click(object sender, RoutedEventArgs e)
        {
            
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
    }
}
